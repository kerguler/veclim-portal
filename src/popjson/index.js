/*
 *  PopJSON: JSON representation for dynamically-structured
 *           multi-process matrix population models.
 *
 *  Copyright (C) 2024  Kamil Erguler <kerguler@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

'use strict';

const version = '1.2.5';

// const fs = require("fs");
// const util = require("util");

const arbiter = {
	ACC_FIXED: 'd',
	ACC_ERLANG: 'd',
	ACC_PASCAL: 'd',
	AGE_FIXED: 'i',
	AGE_CONST: 'i',
	AGE_GAMMA: 'i',
	AGE_NBINOM: 'i',
	AGE_CUSTOM: 'i',
	NOAGE_CONST: 'i',
};

const stepper = {
	NO_STEPPER: '0',
	AGE_STEPPER: 'age_stepper',
	ACC_STEPPER: 'acc_stepper',
};

const hazard = {
	AGE_FIXED: ['age_fixed_pars', 'age_hazard_calc', 'age_fixed_haz'],
	AGE_CONST: ['age_const_pars', 'age_const_calc', 'age_const_haz'],
	AGE_GAMMA: ['age_gamma_pars', 'age_hazard_calc', 'age_gamma_haz'],
	AGE_NBINOM: ['age_nbinom_pars', 'age_hazard_calc', 'age_nbinom_haz'],
	NOAGE_CONST: ['age_const_pars', 'age_const_calc', 'age_const_haz'],
};

class PopJSON {
	constructor() {
		this.header = '';
		this.model = '';
		this.error = '';
		this.json = {};
	}
	check_ids(id) {
		if (!/^[a-zA-Z][a-zA-Z0-9\_]+$/.test(id)) {
			this.error +=
				'Only numeric and alphanumeric characters and "_" are allowed in IDs. Also, IDs should be more than one character and start with an alphanumeric.\nViolating ID is ' +
				id +
				'\n';
			return '';
		}
		if (this.ids.includes(id)) {
			this.error += 'IDs should be unique! Please check ' + id + '\n';
			return '';
		}
		this.ids.push(id);
		return id;
	}
	results() {
		return {
			model: this.header + this.model,
			error: this.error,
			json: this.json,
		};
	}
	// parse_file(filename) {
	// 	this.filename = filename;
	// 	let data = fs.readFileSync(this.filename);
	// 	if (!data) {
	// 		this.error += "File not found!\n";
	// 		return this.results();
	// 	}
	// 	try {
	// 		this.json = JSON.parse(data);
	// 	} catch (e) {
	// 		this.error += "JSON parse error!\n";
	// 		return this.results();
	// 	}
	// 	//
	// 	this.parse();
	// 	return this.results();
	// }
	parse_json(text) {
		try {
			this.json = JSON.parse(text);
		} catch (e) {
			this.error += 'JSON parse error!\n';
			return this.results();
		}
		//
		this.parse();
		return this.results();
	}
	process_json(json) {
		this.json = json;
		//
		this.parse();
		return this.results();
	}
	handle_repeats(obj, label = '', counter = 0) {
		let str = 'for';
		let ret = obj.constructor();
		if (obj.constructor === Object) {
			Object.entries(obj).forEach(([key, value]) => {
				ret[key] = this.handle_repeats(
					value,
					(label = label),
					(counter = counter),
				);
			});
		} else if (obj.constructor === Array) {
			if (obj[0] === str) {
				/*
				 * FOR LOOP
				 */
				if (obj.length != 5) {
					this.error += 'Error in for loop construction!\n';
					this.model = '';
					return {};
				}
				for (let i = obj[2]; i <= obj[3]; i++) {
					let tmp = this.handle_repeats(
						obj[4],
						(label = obj[1]),
						(counter = i),
					);
					if (tmp.constructor === Array && obj[4][0] === str) {
						// NEXT ONE IS A FOR LOOP
						for (let j = 0; j < tmp.length; j++)
							ret.push(
								this.handle_repeats(
									tmp[j],
									(label = label),
									(counter = counter),
								),
							);
					} else {
						ret.push(tmp);
					}
				}
			} else {
				/*
				 *
				 */
				for (let i = 0; i < obj.length; i++) {
					let tmp = this.handle_repeats(
						obj[i],
						(label = label),
						(counter = counter),
					);
					if (tmp.constructor === Array && obj[i][0] === str) {
						// NEXT ONE IS A FOR LOOP
						for (let j = 0; j < tmp.length; j++)
							ret.push(
								this.handle_repeats(
									tmp[j],
									(label = label),
									(counter = counter),
								),
							);
					} else {
						ret.push(tmp);
					}
				}
			}
		} else if (obj.constructor === String) {
			if (label) {
				var regExp = new RegExp('\\[' + label + '\\]', 'g');
				ret = obj.replace(regExp, counter);
			} else {
				ret = obj;
			}
		} else {
			ret = obj;
		}
		return ret;
	}
	parse() {
		this.json = this.handle_repeats(this.json);
		//
		let that = this;
		this.ids = [];
		this.deterministic = this.json['model']['deterministic'];
		if (!('environ' in this.json)) this.json['environ'] = [];
		this.environs = this.json['environ'].map((pr) =>
			that.check_ids(pr['id']),
		);
		if (!('populations' in this.json)) {
			this.json['populations'] = [];
			this.error += "Couldn't find any populations!\n";
			return this.results();
		}
		this.populations = this.json['populations'].map((pr) =>
			that.check_ids(pr['id']),
		);
		this.popobj = {};
		this.json['populations'].forEach(
			(pop) => (that.popobj[pop['id']] = pop),
		);
		this.processes = [];
		this.json['populations'].forEach((pop) =>
			'processes' in pop
				? pop['processes'].forEach((pr) => {
						that.processes.push(that.check_ids(pr['id']));
					})
				: [],
		);
		this.processobj = {};
		this.json['populations'].forEach((pop) =>
			'processes' in pop
				? pop['processes'].forEach((pr) => {
						that.processobj[pr['id']] = pr;
						that.processobj[pr['id']]['parent_id'] = pop['id'];
					})
				: {},
		);
		if (!('parameters' in this.json)) this.json['parameters'] = [];
		this.parametersv = this.json['parameters']
			.filter((p) => !p['constant'])
			.map((pr) => that.check_ids(pr['id']));
		this.parametersc = this.json['parameters']
			.filter((p) => p['constant'])
			.map((pr) => pr['id']);
		if (!('functions' in this.json)) this.json['functions'] = [];
		this.functions = Object.keys(this.json['functions']);
		if (!('intermediates' in this.json)) this.json['intermediates'] = [];
		this.intermediates = this.json['intermediates'].map((pr) =>
			that.check_ids(pr['id']),
		);
		if (!('transformations' in this.json))
			this.json['transformations'] = [];
		this.transformations = this.json['transformations'].map((pr) =>
			that.check_ids(pr['id']),
		);
		if (!('transfers' in this.json)) this.json['transfers'] = [];
		this.transfers = Array.from(
			new Set(
				this.json['transfers'].map((pr) =>
					pr['from'] in that.processobj
						? that.processobj[pr['from']]['parent_id']
						: pr['from'],
				),
			),
		);
		//
		if (!('migrations' in this.json)) this.json['migrations'] = [];
		this.json['migrations'].forEach((pr) => that.check_ids(pr['id']));
		this.migrations = {};
		this.json['migrations'].forEach((mig, i) => {
			let targets =
				mig['target'].constructor === Array
					? mig['target']
					: [mig['target']];
			targets.forEach((spc, i) => {
				let pop;
				if (that.populations.includes(spc)) {
					that.migrations[spc] = that.popobj[spc];
				} else if (that.processes.includes(spc)) {
					that.migrations[spc] = that.processobj[spc];
				} else {
					that.error +=
						'Migration target should either be a population or a process!\nOffending target: ' +
						spc +
						'\n';
					that.model = '';
					return {};
				}
			});
		});
		//
		this.operations = [
			'abs',
			'min',
			'max',
			'round',
			'poisson',
			'binomial',
			'define',
			'?',
			'&&',
			'||',
			'>=',
			'<=',
			'>',
			'<',
			'==',
			'sqrt',
			'pow',
			'exp',
			'log',
			'log2',
			'log10',
			'indicator',
			'index',
			'size',
			'count',
			'*',
			'+',
			'-',
			'/',
			'%',
		];
		this.funparnames = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		];
		//
		this.funcountid = 0;
		//
		this.header = '';
		this.model = '';
		if (!this.error) this.write_model();
	}
	write_model() {
		this.funcountid = 0;
		//
		this.header = '';
		this.model = '';
		this.write_warranty();
		this.write_header();
		this.write_functions();
		this.write_migrate();
		this.write_harvest();
		this.write_custom();
		this.write_init();
		this.write_parnames();
		this.write_destroy();
		this.write_sim();
		this.write_main();
	}
	write_warranty() {
		this.header += '/* \n';
		this.header +=
			' *  This code was automatically generated by PopJSON (v.' +
			version +
			')\n';
		this.header += ' * \n';
		this.header +=
			' *  This program is free software: you can redistribute it and/or modify\n';
		this.header +=
			' *  it under the terms of the GNU General Public License as published by\n';
		this.header +=
			' *  the Free Software Foundation, either version 3 of the License, or\n';
		this.header += ' *  (at your option) any later version.\n';
		this.header += ' *\n';
		this.header +=
			' *  This program is distributed in the hope that it will be useful,\n';
		this.header +=
			' *  but WITHOUT ANY WARRANTY; without even the implied warranty of\n';
		this.header +=
			' *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\n';
		this.header += ' *\n';
		this.header +=
			' *  See the GNU General Public License for more details:\n';
		this.header += ' *  <https://www.gnu.org/licenses/>\n';
		this.header += ' */\n';
		this.header += '\n';
	}
	write_header() {
		let that = this;
		if (this.json['model']['type'] === 'Population') {
			this.header += '#include <math.h>\n';
			this.header += '#include "population.h"\n';
			this.header += '\n';
			if (!this.deterministic) {
				this.header += 'extern gsl_rng *RANDOM;\n';
				this.header += '\n';
			} else if (this.json['model']['type'] === 'ODE') {
				this.header += '#include <stdlib.h>\n';
				this.header += '#include "lsoda.h"\n';
				this.header += '\n';
			}
		}
		//
		this.header += '#define CHECK(x) (isnan(x) || isinf(x))\n';
		this.header += '\n';
		//
		this.numpar = this.json['parameters'].filter(
			(p) => !p['constant'],
		).length;
		this.numpop = this.json['populations'].length;
		this.numint_int = this.json['intermediates'].length;
		this.numint_trans = this.json['transformations'].length;
		this.numint = this.numint_int + this.numint_trans;
		this.numenv = this.environs.length;
		//
		if (this.json['model']['type'] === 'Population') {
			if (this.json['populations'].length === 0) {
				this.numproc = 0;
				this.numprocpar = 0;
			} else {
				this.numproc =
					1 +
					Math.max(
						...this.json['populations'].map((s) =>
							'processes' in s ? s['processes'].length : 0,
						),
					);
				this.numprocpar = Math.max(
					...this.json['populations'].map((spc, i) => {
						let pars = 0;
						if (!('processes' in spc)) return pars;
						spc['processes'].forEach((s) => {
							if (Array.isArray(s['value'])) {
								pars += s['value'].length;
							} else {
								pars += 1;
							}
						});
						return pars;
					}),
				);
			}
		}
		//
		this.popart = {};
		if (this.json['model']['type'] === 'Population') {
			this.json['populations'].forEach((pop) => {
				if (!(pop['id'] in that.popart)) {
					that.popart[pop['id']] = {};
				}
				pop['processes'].forEach((proc) => {
					that.popart[pop['id']][proc['arbiter']] =
						arbiter[proc['arbiter']];
				});
			});
		}
		//
		this.header += '#define NumPar ' + String(this.numpar) + '\n';
		this.header += '#define NumPop ' + String(this.numpop) + '\n';
		this.header += '#define NumInt ' + String(this.numint) + '\n';
		this.header += '#define NumEnv ' + String(this.numenv) + '\n';
		this.header += '\n';
		//
		this.json['parameters']
			.filter((p) => !p['constant'])
			.forEach((pr, i) => {
				that.header += '#define ' + pr['id'] + ' ' + String(i) + '\n';
			});
		this.header += '\n';
		//
		if (this.json['model']['type'] === 'Population') {
			this.json['populations'].forEach((spc, i) => {
				spc['processes'].forEach((prc, j) => {
					that.header +=
						'#define ' + prc['id'] + ' ' + String(j) + '\n';
				});
			});
			this.header += '\n';
		}
		//
		this.json['parameters']
			.filter((p) => p['constant'])
			.forEach((p) => {
				that.header +=
					'double ' + p['id'] + ' = ' + String(p['value']) + ';\n';
			});
		this.header += '\n';
		//
		this.header +=
			'double dmin(double a, double b) { return a < b ? a : b; }\n';
		this.header +=
			'double dmax(double a, double b) { return a > b ? a : b; }\n';
		this.header += '\n';
		//
		this.header += 'int TIME;\n';
		this.header += 'int TIMEF;\n';
		this.header += '\n';
		this.header += 'double *model_param;\n';
		if ('environ' in this.json) {
			this.json['environ'].forEach((elm, i) => {
				that.header += 'double *envir_' + elm['id'] + ';\n';
			});
			this.header += '\n';
		}
		//
		if ('transformations' in this.json) {
			if (this.deterministic) {
				this.json['transformations']
					.map((trx) => trx['id'])
					.forEach((id) => {
						that.header += 'double ' + id + ';\n';
					});
			} else {
				this.json['transformations']
					.map((trx) => trx['id'])
					.forEach((id) => {
						that.header += 'unsigned int ' + id + ';\n';
					});
			}
		}
		//
		if ('intermediates' in this.json) {
			this.json['intermediates'].forEach((elm, i) => {
				that.header += 'double ' + elm['id'] + ';\n';
			});
			this.header += '\n';
		}
		//
		if ('migrations' in this.json) {
			this.json['migrations'].forEach((mig) => {
				that.header +=
					'double tprob_' +
					mig['id'] +
					'[' +
					String(
						mig['target'].constructor === Array
							? Math.pow(mig['target'].length, 2)
							: 1,
					) +
					'];\n';
			});
			this.header += '\n';
			this.write_tprobs();
		}
	}
	write_functions() {
		let that = this;
		if ('functions' in this.json) {
			Object.entries(this.json['functions']).forEach(([key, value]) => {
				that.header +=
					'#define ' + key + that.parse_value(value) + '\n';
			});
			this.header += '\n';
		}
	}
	write_migrate() {
		if (!('migrations' in this.json)) return;
		//
		let that = this;
		var di, pop;
		this.json['migrations'].forEach((trn) => {
			let i = 0;
			trn['target'].forEach((trx0, i0) => {
				trn['target'].forEach((trx1, i1) => {
					that.header +=
						'void fun_harvest_' +
						trn['id'] +
						'_' +
						String(i) +
						'(number *key, number num, number *newkey, double *frac) {\n';
					pop = that.json['populations'].filter(
						(tmp) => tmp['id'] === trx0,
					)[0];
					pop['processes'].forEach((proc, j) => {
						di = that.popart[pop['id']][proc['arbiter']];
						that.header +=
							'    newkey[' +
							String(j) +
							'].' +
							di +
							'=key[' +
							String(j) +
							'].' +
							di +
							';\n';
					});
					that.header +=
						'    *frac = tprob_' +
						trn['id'] +
						'[' +
						String(i) +
						'];\n';
					that.header += '}\n';
					that.header += '\n';
					i++;
				});
			});
		});
	}
	write_harvest() {
		if (!('transfers' in this.json)) return;
		//
		let that = this;
		var di, pop;
		this.json['transfers'].forEach((trn) => {
			that.header +=
				'void fun_harvest_' +
				trn['id'] +
				'(number *key, number num, number *newkey, double *frac) {\n';
			pop = that.json['populations'].filter(
				(tmp) => tmp['id'] === trn['to'],
			)[0];
			pop['processes'].forEach((proc, j) => {
				di = that.popart[pop['id']][proc['arbiter']];
				that.header +=
					'    newkey[' +
					String(j) +
					'].' +
					di +
					'=' +
					that.parse_value(trn['value'][1][j], true) +
					';\n';
			});
			that.header +=
				'    *frac = ' +
				that.parse_value(trn['value'][0], true) +
				';\n';
			that.header += '}\n';
			that.header += '\n';
		});
	}
	write_transfer() {
		if (!('transfers' in this.json)) return;
		//
		let that = this;
		var di, pop;
		this.json['transfers'].forEach((trn) => {
			that.header +=
				'void fun_transfer_' +
				trn['id'] +
				'(number *key, number num, void *pop) {\n';
			that.header += '    number q[' + String(that.numproc) + '] = {\n';
			// pop = that.json['populations'].filter( (tmp) => tmp['id'] ===that.processobj[trn['to']]['parent_id'] )[0];
			pop = that.json['populations'].filter(
				(tmp) => tmp['id'] === trn['to'],
			)[0];
			pop['processes'].forEach((proc, j) => {
				di = that.popart[pop['id']][proc['arbiter']];
				that.header +=
					'        {.' +
					di +
					'=' +
					that.parse_value(trn['value'][j], true) +
					'},\n';
			});
			that.header += '    };\n';
			that.header += '    spop2_add(*(population *)pop, q, num);\n';
			that.header += '}\n';
			that.header += '\n';
		});
	}
	write_custom() {
		let that = this;
		this.json['populations'].forEach((pop) => {
			if (!('processes' in pop) || pop['processes'].length === 0) return;
			pop['processes'].forEach((proc) => {
				if ('hazard' in proc) {
					that.header +=
						'double fun_hazard_' +
						proc['id'] +
						'_' +
						pop['id'] +
						'(hazard hfun, unsigned int d, number q, number k, double theta, const number *key) {\n';
					that.header +=
						'    double devmn = ' +
						that.parse_value(proc['hazard'][1], true) +
						';\n';
					that.header +=
						'    double devsd = ' +
						that.parse_value(proc['hazard'][2], true) +
						';\n';
					that.header +=
						'    hazpar hz = ' +
						hazard[proc['hazard'][0]][0] +
						'(devmn, devsd);\n';
					that.header +=
						'    double a = ' +
						hazard[proc['hazard'][0]][1] +
						'(' +
						hazard[proc['hazard'][0]][2] +
						', 0, key[' +
						proc['id'] +
						'], hz.k, hz.theta, key);\n';
					that.header += '    return a;\n';
					that.header += '}\n';
					that.header += '\n';
				}
				if ('hazpar' in proc && proc['hazpar']) {
					that.header +=
						'void fun_hazpar_' +
						proc['id'] +
						'_' +
						pop['id'] +
						'(const number *key, const number num, double *par) {\n';
					proc['value'].forEach((val, i) => {
						that.header +=
							'    par[' +
							String(i) +
							'] = ' +
							that.parse_value(val, true) +
							';\n';
					});
					that.header += '}\n';
					that.header += '\n';
				}
			});
		});
	}
	write_init() {
		this.model +=
			'void init(int *no, int *np, int *ni, int *ne, int *st) {\n';
		if (this.json['model']['type'] === 'Population') {
			if (!this.deterministic) {
				this.model += '    spop2_random_init();\n';
				this.model += '\n';
			}
			if ('istep' in this.json['model']['parameters']) {
				this.model +=
					'    spop2_set_eps(' +
					String(this.json['model']['parameters']['istep']) +
					');\n';
				this.model += '\n';
			}
		}
		this.model += '    *no = NumPop;\n';
		this.model += '    *np = NumPar;\n';
		this.model += '    *ni = NumInt;\n';
		this.model += '    *ne = NumEnv;\n';
		this.model += '    *st = ' + (this.deterministic ? '0' : '1') + ';\n';
		this.model += '}\n';
		this.model += '\n';
	}
	write_parnames() {
		let that = this;
		this.model +=
			'void parnames(char **names, double *param, double *parmin, double *parmax) {\n';
		this.model += '    char temp[NumPop+NumPar+NumInt+NumEnv][256] = {\n';
		if (this.numpop > 0) {
			this.model +=
				'        "' +
				this.json['populations'].map((s) => s['id']).join('", "') +
				'",\n';
		}
		if (this.numpar > 0) {
			this.model +=
				'        "' +
				this.json['parameters']
					.filter((p) => !p['constant'])
					.map((pr) => pr['id'])
					.join('", "') +
				'",\n';
		}
		if (this.numint_int > 0) {
			this.model +=
				'        "' +
				this.json['intermediates'].map((pr) => pr['id']).join('", "') +
				'",\n';
		}
		if (this.numint_trans > 0) {
			this.model +=
				'        "' +
				this.json['transformations']
					.map((pr) => pr['id'])
					.join('", "') +
				'",\n';
		}
		if (this.numenv > 0) {
			this.model += '        "' + this.environs.join('", "') + '",\n';
		}
		this.model += '    };\n';
		this.model += '\n';
		this.model += '    int i;\n';
		this.model += '    for (i=0; i<(NumPop+NumPar+NumInt+NumEnv); i++)\n';
		this.model += '        names[i] = strdup(temp[i]);\n';
		this.model += '\n';
		this.json['parameters']
			.filter((p) => !p['constant'])
			.forEach((pr, i) => {
				that.model +=
					'    param[' +
					pr['id'] +
					'] = ' +
					String(
						'value' in pr ? this.parse_value(pr['value']) : 0.0,
					) +
					';\n';
				that.model +=
					'    parmin[' +
					pr['id'] +
					'] = ' +
					String(
						'min' in pr
							? this.parse_value(pr['min'])
							: 'value' in pr
								? this.parse_value(pr['value'])
								: 0.0,
					) +
					';\n';
				that.model +=
					'    parmax[' +
					pr['id'] +
					'] = ' +
					String(
						'max' in pr
							? this.parse_value(pr['max'])
							: 'value' in pr
								? this.parse_value(pr['value'])
								: 0.0,
					) +
					';\n';
			});
		this.model += '}\n';
		this.model += '\n';
	}
	write_destroy() {
		this.model += 'void destroy(void) {\n';
		if (
			this.json['model']['type'] === 'Population' &&
			!this.deterministic
		) {
			this.model += '    spop2_random_destroy();\n';
		}
		this.model += '}\n';
		this.model += '\n';
	}
	write_out(tab, iret = true) {
		let that = this;
		if (this.deterministic) {
			this.json['populations'].forEach((spc, i) => {
				that.model +=
					'    '.repeat(tab) +
					'ret[' +
					String(i) +
					'] = size_' +
					spc['id'] +
					'.d;\n' +
					'    '.repeat(tab) +
					'if (CHECK(ret[' +
					String(i) +
					'])) {goto endall;};\n';
			});
		} else {
			this.json['populations'].forEach((spc, i) => {
				that.model +=
					'    '.repeat(tab) +
					'ret[' +
					String(i) +
					'] = (double)(size_' +
					spc['id'] +
					'.i);\n' +
					'    '.repeat(tab) +
					'if (CHECK(ret[' +
					String(i) +
					'])) {goto endall;};\n';
			});
		}
		this.model += '\n';
		this.model +=
			'    '.repeat(tab) +
			'ret += ' +
			String(this.json['populations'].length) +
			';\n';
		this.model += '\n';
		if (iret) {
			if ('intermediates' in this.json) {
				this.json['intermediates'].forEach((spc, i) => {
					that.model +=
						'    '.repeat(tab) +
						'iret[' +
						String(i) +
						'] = ' +
						spc['id'] +
						';\n' +
						'    '.repeat(tab) +
						'if (CHECK(iret[' +
						String(i) +
						'])) {goto endall;};\n';
				});
				this.model += '\n';
			}
			if ('transformations' in this.json) {
				this.json['transformations'].forEach((spc, i) => {
					that.model +=
						'    '.repeat(tab) +
						'iret[' +
						String(this.json['intermediates'].length + i) +
						'] = ' +
						spc['id'] +
						';\n' +
						'    '.repeat(tab) +
						'if (CHECK(iret[' +
						String(i) +
						'])) {goto endall;};\n';
				});
				this.model += '\n';
			}
			if ('intermediates' in this.json) {
				this.model +=
					'    '.repeat(tab) +
					'iret += ' +
					String(
						this.json['intermediates'].length +
							this.json['transformations'].length,
					) +
					';\n';
			}
			this.model += '\n';
		}
	}
	write_tprobs() {
		this.model +=
			'void prepare_tprobs(int numcol, double *ttprobs, double *tprobs) {\n';
		this.model += '    int rA, rB, i = 0;\n';
		this.model += '    double sum;\n';
		this.model += '    for (i=0, rB=0; rB<numcol; rB++) {\n';
		this.model += '        sum = 1.0;\n';
		this.model += '        for (rA=0; rA<numcol; rA++, i++) {\n';
		this.model +=
			'            tprobs[i] = sum <= 0.0 ? 1.0 : ttprobs[i] / sum;\n';
		this.model += '            sum -= ttprobs[i];\n';
		this.model += '        }\n';
		this.model += '    }\n';
		this.model += '}\n';
		this.model += '\n';
	}
	write_sim() {
		let i, j;
		let that = this;
		let det = this.deterministic ? 'DETERMINISTIC' : 'STOCHASTIC';
		this.model +=
			'void sim(int tf, int rep, double *envir, double *pr, double *y0, const char *file0, const char *file1, double *ret, double *iret, int *success) {\n';
		this.model += '\n';
		this.model += '    TIME = 0;\n';
		this.model += '    TIMEF = tf;\n';
		this.model += '\n';
		this.model += '    model_param = pr;\n';
		if ('environ' in this.json) {
			this.model += '\n';
			this.json['environ'].forEach((elm, i) => {
				that.model +=
					'    envir_' +
					elm['id'] +
					' = envir + 1; envir += (int)round(*envir) + 1;\n';
			});
			this.model += '\n';
		}
		//
		if ('migrations' in this.json) {
			this.json['migrations'].forEach((trg) => {
				if (!that.environs.includes(trg['prob'])) {
					that.error += 'Migration probability matrix is missing!\n';
					that.model = '';
					return {};
				}
				let len =
					trg['target'].constructor === Array
						? trg['target'].length
						: 1;
				that.model +=
					'    prepare_tprobs(' +
					len +
					', envir_' +
					trg['prob'] +
					', tprob_' +
					trg['id'] +
					');\n';
			});
			this.model += '\n';
		}
		//
		if (this.json['model']['type'] === 'Population') {
			this.json['populations'].forEach((spc) => {
				that.model += '    population ' + String(spc['id']) + ';\n';
			});
			this.model += '\n';
		}
		if (this.json['model']['type'] === 'Population') {
			this.model += '    number num = numZERO;\n';
			this.model += '    char arbiters[' + String(this.numproc) + '];\n';
			this.model += '    number key[' + String(this.numproc) + '];\n';
			this.json['populations'].forEach((spc, i) => {
				that.model += '    number size_' + spc['id'] + ';\n';
			});
			this.json['populations'].forEach((spc, i) => {
				if (spc['processes'].length === 0) return;
				//
				that.model +=
					'    number completed_' +
					spc['id'] +
					'[' +
					String(that.numproc) +
					'];\n';
			});
			this.json['populations'].forEach((spc, i) => {
				if (
					that.transfers &&
					that.transfers.includes(spc['id']) &&
					that.populations.includes(spc['id'])
				) {
					that.model +=
						'    population popdone_' +
						spc['id'] +
						'[' +
						String(that.numproc) +
						'];\n';
				}
			});
			if ('migrations' in this.json) {
				Object.keys(this.migrations).forEach((trg) => {
					that.model += '    population popdummy_' + trg + ';\n';
				});
			}
			if ('transformations' in this.json) {
				if (this.deterministic) {
					this.json['transformations']
						.map((trx) => trx['id'])
						.forEach((id) => {
							that.model += '    ' + id + ' = 0.0;\n';
						});
				} else {
					this.json['transformations']
						.map((trx) => trx['id'])
						.forEach((id) => {
							that.model += '    ' + id + ' = 0;\n';
						});
				}
			}
			this.model += '    double par[' + String(this.numprocpar) + '];\n';
			this.model += '\n';
			//
			this.model += '    FILE *file;\n';
			this.model += '    number *buff = 0;\n';
			this.model += '    unsigned int buffsz = 0;\n';
			this.model += "    if (file0 && file0[0]!=' ') {\n";
			this.model += '        file = fopen(file0,"rb");\n';
			this.model += '        if (!file) {\n';
			this.model += '            *success = 0;\n';
			this.model += '            goto endall;\n';
			this.model += '        }\n';
			this.model += '        rewind(file);\n';
			this.model += '    }\n';
			this.model += '\n';
			this.model += "    if (file0 && file0[0]!=' ') {\n";
			this.json['populations'].forEach((spc, i) => {
				that.model +=
					'        fread(&buffsz, sizeof(unsigned int), 1, file);\n';
				that.model += '        buff = (number *)malloc(buffsz);\n';
				that.model += '        fread(buff, buffsz, 1, file);\n';
				that.model +=
					'        ' + spc['id'] + ' = spop2_loadstate(buff);\n';
				that.model += '\n';
				if (
					that.transfers &&
					that.transfers.includes(spc['id']) &&
					that.populations.includes(spc['id'])
				) {
					for (j = 0; j < that.numproc; j++) {
						that.model +=
							'        popdone_' +
							spc['id'] +
							'[' +
							String(j) +
							'] = spop2_loadstate_empty(buff);\n';
					}
				}
				that.model += '\n';
				that.model += '        free(buff);\n';
				that.model += '\n';
			});
			this.model += '    } else {\n';
			this.json['populations'].forEach((spc, i) => {
				for (j = 0; j < that.numproc; j++) {
					that.model +=
						'        arbiters[' +
						String(j) +
						'] = ' +
						(j < spc['processes'].length
							? spc['processes'][j]['arbiter']
							: 'STOP') +
						';\n';
					that.model += '        key[' + String(j) + '] = numZERO;\n';
				}
				that.model +=
					'        ' +
					spc['id'] +
					' = spop2_init(arbiters, ' +
					det +
					');\n';
				for (j = 0; j < that.numproc; j++) {
					if (
						j < spc['processes'].length &&
						'stepper' in spc['processes'][j]
					) {
						if (!(spc['processes'][j]['stepper'] in stepper)) {
							that.error +=
								'Stepper not defined. Please choose one of these: ' +
								Object.keys(stepper).join(', ') +
								'\n';
							break;
						}
						that.model +=
							'        ' +
							spc['id'] +
							'->arbiters[' +
							String(j) +
							']->fun_step = ' +
							stepper[spc['processes'][j]['stepper']] +
							';\n';
					}
					if (j < spc['processes'].length) {
						if ('hazard' in spc['processes'][j]) {
							if (!(spc['processes'][j]['hazard'][0] in hazard)) {
								that.error +=
									'Hazard not defined. Please choose one of these: ' +
									Object.keys(hazard).join(', ') +
									'\n';
								break;
							}
							that.model +=
								'        ' +
								spc['id'] +
								'->arbiters[' +
								String(j) +
								']->fun_calc = fun_hazard_' +
								spc['processes'][j]['id'] +
								'_' +
								spc['id'] +
								';\n';
						}
						if ('hazpar' in spc['processes'][j]) {
							that.model +=
								'        ' +
								spc['id'] +
								'->arbiters[' +
								String(j) +
								']->fun_q_par = fun_hazpar_' +
								spc['processes'][j]['id'] +
								'_' +
								spc['id'] +
								';\n';
						}
					}
				}
				that.model +=
					'        if (y0[' +
					String(i) +
					']) { num.' +
					('i', that.deterministic ? 'd' : 'i') +
					' = y0[' +
					String(i) +
					']; spop2_add(' +
					spc['id'] +
					', key, num); }\n';
				that.model += '\n';
				if (
					that.transfers &&
					that.transfers.includes(spc['id']) &&
					that.populations.includes(spc['id'])
				) {
					for (j = 0; j < that.numproc; j++) {
						that.model +=
							'        popdone_' +
							spc['id'] +
							'[' +
							String(j) +
							'] = spop2_init(arbiters, ' +
							det +
							');\n';
					}
				}
				this.model += '\n';
			});
			that.model += '    }\n';
			this.model += '\n';
			this.model += "    if (file0 && file0[0]!=' ') {\n";
			this.model += '        fclose(file);\n';
			this.model += '    }\n';
			this.model += '\n';
			Object.keys(this.migrations).forEach((trg) => {
				let spc =
					that.popobj[
						trg in that.popobj
							? trg
							: that.processobj[trg]['parent_id']
					];
				for (j = 0; j < that.numproc; j++) {
					that.model +=
						'    arbiters[' +
						String(j) +
						'] = ' +
						(j < spc['processes'].length
							? spc['processes'][j]['arbiter']
							: 'STOP') +
						';\n';
					that.model += '    key[' + String(j) + '] = numZERO;\n';
				}
				that.model +=
					'    popdummy_' +
					trg +
					' = spop2_init(arbiters, ' +
					det +
					');\n';
				that.model += '\n';
			});
		}
		//
		if ('intermediates' in this.json) {
			this.json['intermediates'].forEach((elm, i) => {
				that.model += '    ' + elm['id'] + ' = 0.0;\n';
			});
			this.model += '\n';
		}
		//
		this.json['populations'].forEach((spc, i) => {
			that.model +=
				'    size_' + spc['id'] + ' = spop2_size(' + spc['id'] + ');\n';
		});
		this.model += '\n';
		this.write_out(1, false);
		this.model += '    for (TIME=1; TIME<tf; TIME++) {\n';
		//
		if ('intermediates' in this.json) {
			this.json['intermediates'].forEach((elm) => {
				that.model +=
					'        ' +
					elm['id'] +
					' = ' +
					that.parse_value(elm['value']) +
					';\n';
			});
			this.model += '\n';
		}
		//
		this.model += '        if (rep >= 0) {\n';
		//
		if (this.json['model']['type'] === 'Population') {
			this.json['populations'].forEach((spc, i) => {
				if (spc['processes'].length === 0) return;
				//
				let pars = [];
				spc['processes'].forEach((s) => {
					if (Array.isArray(s['value'])) {
						s['value'].forEach((ss) =>
							pars.push(
								'hazpar' in s && s['hazpar'] ? '0.0' : ss,
							),
						);
					} else {
						pars.push(
							'hazpar' in s && s['hazpar'] ? '0.0' : s['value'],
						);
					}
				});
				for (j = 0; j < that.numprocpar; j++) {
					that.model +=
						'                par[' +
						String(j) +
						'] = ' +
						(pars.length ? that.parse_value(pars.shift()) : '0.0') +
						';\n';
				}
				that.model +=
					'                spop2_step(' +
					spc['id'] +
					', par, &size_' +
					spc['id'] +
					', completed_' +
					spc['id'] +
					', ' +
					(that.transfers.includes(spc['id']) &&
					that.populations.includes(spc['id'])
						? 'popdone_' + spc['id']
						: '0') +
					');\n';
				that.model += '\n';
			});
			//
			/*
                TO DO!
                THERE SHOULD BE AN ORDER TO THESE PROCESSES:
                    INTERMEDIATES
                    TRANSFORMATIONS
                    TRANSFERS
            */
			if ('transformations' in this.json) {
				this.json['transformations'].forEach((trx) => {
					if ('if' in trx) {
						that.model +=
							'                if (' +
							that.parse_value(trx['if']) +
							') {\n';
					}
					that.model +=
						'                ' +
						trx['id'] +
						' = ' +
						that.parse_value(trx['value']) +
						';\n';
					that.model += '\n';
					if ('to' in trx) {
						for (j = 0; j < that.numproc; j++) {
							that.model +=
								'                key[' +
								String(j) +
								'] = numZERO;\n';
						}
						that.model +=
							'                num' +
							(that.deterministic ? '.d' : '.i') +
							' = ' +
							trx['id'] +
							';\n';
						that.model +=
							'                spop2_add(' +
							trx['to'] +
							', key, num);\n';
						that.model += '\n';
						if (that.deterministic) {
							that.model +=
								'                size_' +
								trx['to'] +
								'.d += ' +
								trx['id'] +
								';\n';
						} else {
							that.model +=
								'                size_' +
								trx['to'] +
								'.i += ' +
								trx['id'] +
								';\n';
						}
					}
					if ('if' in trx) {
						that.model += '                }\n';
					}
				});
				that.model += '\n';
			}
			//
			if ('transfers' in this.json) {
				this.json['transfers'].forEach((trn) => {
					if ('if' in trn) {
						that.model +=
							'                if (' +
							that.parse_value(trn['if']) +
							') {\n';
					}
					if (trn['from'] in that.processobj) {
						that.model +=
							'                spop2_harvest(popdone_' +
							that.processobj[trn['from']]['parent_id'] +
							'[' +
							trn['from'] +
							'], ' +
							trn['to'] +
							', fun_harvest_' +
							trn['id'] +
							');\n';
					} else if (that.populations.includes(trn['from'])) {
						that.model +=
							'                spop2_harvest(' +
							trn['from'] +
							', ' +
							trn['to'] +
							', fun_harvest_' +
							trn['id'] +
							');\n';
					} else {
						that.error +=
							'Error in defining the source population for transfer: ' +
							trn['from'] +
							'\n';
						return '';
					}
					if ('if' in trn) {
						that.model += '                }\n';
					}
				});
				that.model += '\n';
				//
				Array.from(
					new Set(this.json['transfers'].map((trn) => trn['to'])),
				).forEach((trn) => {
					that.model +=
						'                size_' +
						trn +
						' = spop2_size(' +
						trn +
						');\n';
				});
				that.model += '\n';
			}
			//
			if ('migrations' in this.json) {
				let pops = [];
				this.json['migrations'].forEach((trn) => {
					let i = 0;
					trn['target'].forEach((trx0, i0) => {
						trn['target'].forEach((trx1, i1) => {
							that.model += '                spop2_harvest(';
							if (trx0 in that.processobj) {
								that.model +=
									'popdone_' +
									that.processobj[trx0]['parent_id'] +
									'[' +
									trx0 +
									']';
							} else {
								that.model += trx0;
								if (!pops.includes(trx0)) pops.push(trx0);
							}
							that.model +=
								', popdummy_' +
								trx1 +
								', fun_harvest_' +
								trn['id'] +
								'_' +
								String(i) +
								');\n';
							i++;
						});
					});
				});
				this.model += '\n';
				this.json['migrations'].forEach((trn) => {
					trn['target'].forEach((trx, i) => {
						if (trx in that.processobj) {
							that.model +=
								'                spop2_addpop(popdone_' +
								that.processobj[trx]['parent_id'] +
								'[' +
								trx +
								'], popdummy_' +
								trx +
								');\n';
						} else {
							that.model +=
								'                spop2_addpop(' +
								trx +
								', popdummy_' +
								trx +
								');\n';
						}
					});
				});
				this.model += '\n';
				//
				pops.forEach((pop) => {
					that.model +=
						'                size_' +
						pop +
						' = spop2_size(' +
						pop +
						');\n';
				});
				this.model += '\n';
				//
				this.json['migrations'].forEach((trn) => {
					trn['target'].forEach((trx, i) => {
						if (trx in that.processobj) {
							that.model +=
								'                spop2_empty(&popdone_' +
								that.processobj[trx]['parent_id'] +
								'[' +
								trx +
								']);\n';
						}
					});
				});
				this.model += '\n';
				//
				this.json['migrations'].forEach((trn) => {
					trn['target'].forEach((trx, i) => {
						that.model +=
							'                spop2_empty(&popdummy_' +
							trx +
							');\n';
					});
				});
				this.model += '\n';
			}
			//
			if ('transfers' in this.json) {
				this.transfers.forEach((trn) => {
					for (j = 0; j < that.numproc; j++) {
						that.model +=
							'                spop2_empty(&popdone_' +
							trn +
							'[' +
							String(j) +
							']);\n';
					}
					that.model += '\n';
				});
			}
			//
			that.model += '        }\n';
			that.model += '\n';
			//
			this.write_out(2, true);
		}
		//
		this.model += '    }\n';
		this.model += '\n';
		this.model += '  endall:\n';
		this.model += '\n';
		this.model += '    *success = TIME;\n';
		this.model += '\n';
		this.model += "    if (file1 && file1[0]!=' ') {\n";
		this.model += '        file = fopen(file1,"wb");\n';
		this.model += '        if (!file) {\n';
		this.model += '            *success = 0;\n';
		this.model += '        } else {\n';
		this.model += '            rewind(file);\n';
		this.model += '\n';
		if (this.json['model']['type'] === 'Population') {
			this.json['populations'].forEach((spc) => {
				that.model +=
					'            buffsz = spop2_buffsize(' + spc['id'] + ');\n';
				that.model +=
					'            buff = spop2_savestate(' + spc['id'] + ');\n';
				that.model +=
					'            fwrite(&buffsz, sizeof(unsigned int), 1, file);\n';
				that.model += '            fwrite(buff, buffsz, 1, file);\n';
				that.model += '            free(buff);\n';
				that.model += '\n';
			});
		}
		this.model += '            fclose(file);\n';
		this.model += '        }\n';
		this.model += '    }\n';
		this.model += '\n';
		if (this.json['model']['type'] === 'Population') {
			this.json['populations'].forEach((spc) => {
				that.model += '    spop2_free(&' + spc['id'] + ');\n';
				if (
					that.transfers &&
					that.transfers.includes(spc['id']) &&
					that.populations.includes(spc['id'])
				) {
					for (j = 0; j < that.numproc; j++) {
						that.model +=
							'    spop2_free(&(popdone_' +
							spc['id'] +
							'[' +
							String(j) +
							']));\n';
					}
				}
			});
			if ('migrations' in this.json && this.migrations) {
				Object.keys(this.migrations).forEach((trg) => {
					that.model += '    spop2_free(&(popdummy_' + trg + '));\n';
				});
			}
			this.model += '\n';
		}
		this.model += '}\n';
		this.model += '\n';
	}
	write_main() {
		this.model += 'int main(int argc, char *argv[]) {\n';
		this.model += '    return 0;\n';
		this.model += '}\n';
		this.model += '\n';
	}
	write_funcount(funname, context) {
		this.header += 'char ' + funname + '(number *key) {\n';
		this.header += '    return ' + context + ';\n';
		this.header += '}\n';
		this.header += '\n';
	}
	parse_value(value, transfers = false) {
		let that = this;
		if (Array.isArray(value)) {
			// Function
			let fun = this.parse_value(value[0], (transfers = transfers));
			if (fun === 'define') {
				if (!value[1].every((v) => that.funparnames.includes(v))) {
					this.error +=
						'Error in function definition\nYou are allowed to use these as parameter names:\n' +
						that.funparnames +
						'\nERROR: ' +
						fun +
						' : ' +
						value +
						'\n';
					return '';
				}
				let def = this.parse_value(value[2], (transfers = transfers));
				return '(' + value[1].join(',') + ') (' + def + ')';
			} else if (fun === 'count') {
				let pop = value[1];
				if (
					!that.json['populations'].filter(
						(tmp) => tmp['id'] === pop,
					)[0]
				) {
					this.error +=
						'Error in count request\nHere is the correct usage:\n["count", "population name", [condition]]\n';
					return '';
				}
				this.funcountid += 1;
				let funname = 'fun_count_' + pop + '_' + this.funcountid;
				let context = this.parse_value(value[2], (transfers = true));
				this.write_funcount(funname, context);
				return (
					'spop2_count(' +
					pop +
					', ' +
					funname +
					')' +
					(this.deterministic ? '.d' : '.i')
				);
			} else if (this.environs.includes(fun)) {
				let prm = this.parse_value(value[1], (transfers = transfers));
				return 'envir_' + fun + '[' + prm + ']';
			} else {
				let prm = value
					.slice(1)
					.map((v) => that.parse_value(v, (transfers = transfers)));
				if (fun === 'size') {
					return (
						'size_' + prm[0] + (this.deterministic ? '.d' : '.i')
					);
				} else if (fun === 'index') {
					return prm[0] + '[' + prm[1] + ']';
				} else if (fun === 'round') {
					return fun + '(' + prm.join(', ') + ')';
				} else if (fun === 'min') {
					return 'dmin(' + prm.join(', ') + ')';
				} else if (fun === 'max') {
					return 'dmax(' + prm.join(', ') + ')';
				} else if (fun === 'abs') {
					return 'fabs(' + prm.join(', ') + ')';
				} else if (
					this.functions.includes(fun) ||
					fun === 'exp' ||
					fun === 'log' ||
					fun === 'log2' ||
					fun === 'log10' ||
					fun === 'pow' ||
					fun === 'sqrt'
				) {
					return fun + '(' + prm.join(', ') + ')';
				} else if (fun === 'binomial') {
					return (
						'(unsigned int)gsl_ran_binomial(RANDOM, ' +
						prm[0] +
						', ' +
						prm[1] +
						')'
					);
				} else if (fun === 'poisson') {
					return (
						'(unsigned int)gsl_ran_poisson(RANDOM, ' + prm[0] + ')'
					);
				} else if (fun === '*') {
					return '(' + prm.join(' * ') + ')';
				} else if (fun === '+') {
					return '(' + prm.join(' + ') + ')';
				} else if (fun === '-') {
					return '(' + prm.join(' - ') + ')';
				} else if (fun === '/') {
					return '(' + prm.join(' / ') + ')';
				} else if (fun === '%') {
					return '((' + prm[0] + ') % (' + prm[1] + '))';
				} else if (fun === '?') {
					return (
						'((' +
						prm[0] +
						') ? (' +
						prm[1] +
						') : (' +
						prm[2] +
						'))'
					);
				} else if (fun === '&&') {
					return '(' + prm.join(' && ') + ')';
				} else if (fun === '||') {
					return '(' + prm.join(' || ') + ')';
				} else if (fun === 'indicator') {
					return this.deterministic
						? '(' + prm[0] + ' ? 1.0 : 0.0)'
						: '(' + prm[0] + ' ? 1 : 0)';
				} else if (fun === '==') {
					return '(' + prm[0] + ' ===' + prm[1] + ')';
				} else if (fun === '>') {
					return '(' + prm[0] + ' > ' + prm[1] + ')';
				} else if (fun === '<') {
					return '(' + prm[0] + ' < ' + prm[1] + ')';
				} else if (fun === '>=') {
					return '(' + prm[0] + ' >= ' + prm[1] + ')';
				} else if (fun === '<=') {
					return '(' + prm[0] + ' <= ' + prm[1] + ')';
				} else {
					this.error +=
						'Unknown keyword in equation\nERROR: ' +
						fun +
						' : ' +
						value +
						'\n';
					return '';
				}
			}
		} else {
			// Parameter
			if (typeof value === 'string' || value instanceof String) {
				// String
				if (value in this.processobj) {
					let parent = this.processobj[value]['parent_id'];
					if (transfers) {
						return (
							'key[' +
							value +
							'].' +
							this.popart[parent][
								this.processobj[value]['arbiter']
							]
						);
					}
					return (
						'completed_' +
						parent +
						'[' +
						value +
						']' +
						(this.deterministic ? '.d' : '.i')
					);
				} else if (this.populations.includes(value)) {
					if (transfers) {
						return value;
					}
					return 'size_' + value + (this.deterministic ? '.d' : '.i');
				} else if (this.environs.includes(value)) {
					return value;
				} else if (this.parametersv.includes(value)) {
					return 'model_param[' + value + ']';
				} else if (this.parametersc.includes(value)) {
					return value;
				} else if (this.functions.includes(value)) {
					return value;
				} else if (this.intermediates.includes(value)) {
					return value;
				} else if (this.transformations.includes(value)) {
					return value;
				} else if (this.operations.includes(value)) {
					return value;
				} else if (this.funparnames.includes(value)) {
					return '(' + value + ')';
				} else if (value === 'TIME') {
					return 'TIME';
				} else if (value === 'TIME_1') {
					return '(TIME-1)';
				} else if (value === 'TIMEF') {
					return 'TIMEF';
				} else if (!isNaN(parseFloat(value))) {
					return value;
				} else if (!isNaN(parseInt(value))) {
					return value;
				} else {
					this.error +=
						'Unknown reference to a user defined keyword\nERROR: ' +
						value +
						'\n';
					return '';
				}
			} else if (typeof value === 'number') {
				// Number
				return value.toString();
			} else {
				// NaN
				this.error +=
					'ERROR: Invalid value encountered: ' + value + '\n';
				return '';
			}
		}
	}
}

exports.PopJSON = PopJSON;
