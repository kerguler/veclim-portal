import { setBrushRange, setBrushData } from "../../../store";
import { setBrushDatay } from "../../../store";
class ChartCalculatorService {
	static handleMixedKeys(rawData, params) {
		let r = rawData.current;
		if (!params.mixedKeys) {
			r.rawDataToPlot = {
				...r.data[params.initialSetting][params.years],
			};
		} else {
			// params.mixedKeys.forEach((item) => {
			// 	const { key, level1, level2, level3 } = item;
			// 	if (r.data[level1] && r.data[level1][level2]) {
			// 		r.rawDataToPlot[key] = r.data[level1][level2][level3];
			// 		if ("overlap" in r.data[level1][level2]) {
			// 			r.rawDataToPlot.overlap = r.data[level1][level2].overlap;
			// 		}
			// 	}
			// });
			params.mixedKeys.forEach((item) => {
				const { key, levels } = item;
				let val = r.data;
				if (val != null) {
					levels.forEach((v) => {
						if (v in val) {
							val = val[v];
						}
					});

					r.rawDataToPlot[key] = val;
					if ("overlap" in r.data[levels[0]][levels[1]]) {
						r.rawDataToPlot.overlap = r.data[levels[0]][levels[1]].overlap;
					}
				}
			});
		}
	}

	static handleSlices(params, rawData) {
		let tempStruct = {};
		let r = rawData.current;

		params.plottedKeys.forEach((item) => {
			tempStruct[item] = null;
		});

		if (params.lineSlice.length > 0) {
			let date1Index, date2Index;
			if (params.sliceDate1) {
				date1Index = r.dateArray.indexOf(params.sliceDate1);
				date2Index = r.dateArray.indexOf(params.sliceDate2);
			} else {
				date1Index = r.dateArray.indexOf(r.rawDataToPlot.overlap[1]);
				date2Index = r.dateArray.indexOf(r.rawDataToPlot.overlap[0]);
			}
			let unslicedLine = r.rawDataToPlot[params.lineSlice[0]];
			r.rawDataToPlot.slice1 = unslicedLine.map((element, index) => {
				if (index <= date1Index) {
					return element;
				} else {
					return null;
				}
			});
			r.rawDataToPlot.slice2 = unslicedLine.map((element, index) => {
				if (index >= date1Index && index <= date2Index) {
					return element;
				} else {
					return null;
				}
			});
			r.rawDataToPlot.slice3 = unslicedLine.map((element, index) => {
				if (index >= date2Index) {
					return element;
				} else {
					return null;
				}
			});

			r.dataToPlot = r.dateArray.map((date, index) => {
				const entry = tempStruct;

				for (const key in tempStruct) {
					tempStruct[key] = r.rawDataToPlot[key][index]; // Assuming values1 and values2 have corresponding values
				}

				return { date, ...tempStruct };
			});
		} else {
			r.dataToPlot = r.dateArray.map((date, index) => {
				const entry = tempStruct;

				for (const key in tempStruct) {
					entry[key] = r.rawDataToPlot[key][index]; // Assuming values1 and values2 have corresponding values
				}

				return { date, ...entry };
			});
		}
	}

	static decideBrushRange(parameters, plotMat, dispatch, d, xBrushRange) {
		d.currentDate = new Date();
		d.dStart = new Date();
		d.dEnd = new Date();
		if (xBrushRange.startIndex !== null && xBrushRange.endIndex !== null) {
			//that means someone has b4een fiddling with brush we need to set it
			d.index[0] = xBrushRange.startIndex;
			d.index[1] = xBrushRange.endIndex;
		} else {
			//noone has played with brush, so we need to set the brush to the start and end of the data
			if (parameters.xbrushStart && parameters.xbrushEnd) {
				// there is a specified start and end
				d.dStart.setMonth(d.currentDate.getMonth() + parameters.xbrushStart);
				d.dEnd.setMonth(d.currentDate.getMonth() + parameters.xbrushEnd);
			} else {
				//no start and end specified, so we need to set the brush to the start and end of the data
				d.dStart = new Date(plotMat[0].date);
				d.dEnd = new Date(plotMat[plotMat.length - 1].date);
			}
			d.finalStart = Math.max(
				d.dStart.getTime(),
				new Date(plotMat[0].date).getTime()
			);

			d.finalEnd = Math.min(
				d.dEnd.getTime(),
				new Date(plotMat[plotMat.length - 1].date).getTime()
			);
			d.index[0] = ChartCalculatorService.dateToIndex(
				ChartCalculatorService.formatDate(d.finalStart),
				plotMat
			);
			d.index[1] = ChartCalculatorService.dateToIndex(
				ChartCalculatorService.formatDate(d.finalEnd),
				plotMat
			);
		}
	}

	static handleBrushChange = (range, dispatch, plotMat) => {
		dispatch(
			setBrushRange({ startIndex: range.startIndex, endIndex: range.endIndex })
		);
	};
	static createDateArray(rawData, params) {
		let r = rawData.current;
		let date0, date1;
		if (params.date0) {
			date0 = new Date(params.date0);
			date1 = new Date(params.date1);
		} else {
			date0 = new Date(r.data.date.date0);
			date1 = new Date(r.data.date.date1);
		}
		let currentDate = date0;
		r.dateArray = [];
		while (currentDate <= date1) {
			let formattedDate = this.formatDate(currentDate);
			currentDate.setDate(currentDate.getDate() + 1);
			r.dateArray.push(formattedDate);
		}
	}
	static formatDate = (date) => {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = `0${d.getMonth() + 1}`.slice(-2); // Months are 0-based
		const day = `0${d.getDate()}`.slice(-2);
		return `${year}-${month}-${day}`;
	};
	static dateToIndex = (date, plotMat) => {
		const dateIndex = plotMat.findIndex((d) => d.date === date);
		if (date && dateIndex === -1) {
			throw new Error(
				`date not found in plotMat date you entered is ${date} our range is ${
					plotMat[0].date
				} -- ${plotMat[plotMat.length - 1].date}`
			);
		} else {
			return dateIndex;
		}
	};

	static handleBrushChangeY(range, scrlRef, dispatch) {
		let s = scrlRef.current && scrlRef.current;
		if (scrlRef.current) {
			s.brushDataY = {
				min:
					s.minmax.min +
					(s.minmax.max - s.minmax.min) *
						Math.pow(
							(s.minmaxId.max - range.endIndex) /
								(s.minmaxId.max - s.minmaxId.min),
							s.scrollScl
						),
				max:
					s.minmax.min +
					(s.minmax.max - s.minmax.min) *
						Math.pow(
							(s.minmaxId.max - range.startIndex) /
								(s.minmaxId.max - s.minmaxId.min),
							s.scrollScl
						),
			};
			dispatch(
				setBrushDatay({
					min:
						s.minmax.min +
						(s.minmax.max - s.minmax.min) *
							Math.pow(
								(s.minmaxId.max - range.endIndex) /
									(s.minmaxId.max - s.minmaxId.min),
								s.scrollScl
							),
					max:
						s.minmax.min +
						(s.minmax.max - s.minmax.min) *
							Math.pow(
								(s.minmaxId.max - range.startIndex) /
									(s.minmaxId.max - s.minmaxId.min),
								s.scrollScl
							),
				})
			);
		} else {
			HTMLFormControlsCollection.log("no scrlRef");
			// setBrushDataY({ min: range.startIndex, max: range.endIndex });
		}
	}
}
export default ChartCalculatorService;
