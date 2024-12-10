class ChartCalculatorService {
	static handleMixedKeys(rawData, params) {
		let r = rawData.current;
		r.rawDataToPlot = {};
		if (!params.mixedKeys) {
			r.rawDataToPlot = {
				...r.data[params.mixedKeys[0].key],
			};
		} else {
			r.dateInfo.dates["overlaps"] = {};
			params.mixedKeys.forEach((item) => {
				const { key, levels } = item;
				let val = r.data;

				if (val != null) {
					levels.forEach((v) => {
						if ("overlap" in val) {
							r.dateInfo.dates.overlaps[key] = val["overlap"];
						}
						if (v in val) {
							val = val[v];
						}
					});

					r.rawDataToPlot[key] = val;
				}
			});
		}
	}

	static slicer(r, key, result) {
		let resultArray = [];
		// Iterate through each date in the total date array
		r.dateInfo.dateArray.total.forEach((date, index) => {
			// Initialize an object for this date
			let entry = { date };

			Object.keys(r.rawDataToPlot).forEach((key) => {
				const keyData = r.rawDataToPlot[key];
				if (key !== "key") {
					// If there are no slices, use the main key data directly
					if (!keyData.slices || Object.keys(keyData.slices).length === 0) {
						entry[key] = keyData[index] || null; // Add value or null if out of range
					} else {
						// If there are slices, add each slice as key.slice1, key.slice2, etc.
						Object.keys(keyData.slices).forEach((sliceKey) => {
							entry[`${key}.${sliceKey}`] =
								keyData.slices[sliceKey][index] || null;
						});
					}
				}
			});

			// Add the entry for this date to the result array
			resultArray.push(entry);
		});

		// Log the resulting array
		r.dataToPlot = resultArray;
		r["done"] = true;
	}

	static handleSlices(rawData, params) {
		// let tempStruct = {};
		let r = rawData.current;

		// params.plottedKeys.forEach((item) => {
		// 	tempStruct[item] = null;
		// });
		r.dateInfo.dates.sliceIndices = {};

		params.mixedKeys.forEach((item) => {
			const { key } = item;
			r.dateInfo.dates.sliceIndices[key] = [];
			let mat1 = [...r.rawDataToPlot[key]];
			let alignedMat1 = Array(r.dateInfo.dateArray.total.length).fill(null);

			let startDate = r.dateInfo.dateArray[key][0];
			let endDate = r.dateInfo.dateArray[key][r.dateInfo.dates[key].length - 1];
			// we have to only copy the values for where the domains match.
			r.dateInfo.dateArray.total.forEach((date, index) => {
				if (date < startDate) {
					alignedMat1[index] = null;
				} else if (date > endDate) {
					alignedMat1[index] = null;
				} else {
					alignedMat1[index] = mat1[r.dateInfo.dateArray[key].indexOf(date)];
				}
			});
			r.rawDataToPlot[key] = {};
			r.rawDataToPlot[key][key] = alignedMat1;
			r.rawDataToPlot[key].slices = {};
			let result = [];
			// we have to deteremine where to cut the data so lets find and index for each overlap date.
			if ( !r.dateInfo.dates.overlaps[key]) {
				r.rawDataToPlot[key].slices["slice0"] = r.rawDataToPlot[key][key];
			} else {
				r.dateInfo.dates.overlaps[key].forEach((date) => {
					r.dateInfo.dates.sliceIndices[key].push(
						r.dateInfo.dateArray.total.indexOf(date)
					);
				});

				let sortedIndices = r.dateInfo.dates.sliceIndices[key].sort(
					(a, b) => a - b
				);

				let starter = 0;
				let totalLength = r.rawDataToPlot[key][key].length; // Length of the original array
				sortedIndices.forEach((index) => {
					// Define a local start variable for each iteration
					const currentStarter = starter;

					// Create a slice for the current range
					let slice = []; // Initialize with nulls

					// Copy values into their correct positions
					r.rawDataToPlot[key][key]
						.slice(currentStarter, index)
						.forEach((value, idx) => {
							slice[currentStarter + idx] = value; // Insert value at the correct position
						});

					// Add the slice to the result
					result.push(slice);

					// Update starter for the next range
					starter = index;
				});

				// Handle the last range
				let finalSlice = Array(totalLength).fill(null); // Initialize with nulls
				r.rawDataToPlot[key][key].slice(starter).forEach((value, idx) => {
					finalSlice[starter + idx] = value; // Copy values into their original positions
				});
				result.push(finalSlice);

				// Store slices back into r.rawDataToPlot
				result.forEach((slice, index) => {
					r.rawDataToPlot[key].slices[`slice${index}`] = slice;
				});
			}
			this.slicer(r, key, result);
		});
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

	static decideBrushRangeAlbo(parameters, plotMat, dispatch, d, xBrushRange) {
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

	static handleBrushChange = (range, dispatch, plotMat, setBrushRangeDir) => {
		dispatch(
			setBrushRangeDir({
				startIndex: range.startIndex,
				endIndex: range.endIndex,
			})
		);
	};

	static createDateArray(rawData, params, dates) {
		let r = rawData.current;
		r.dateInfo = {};
		r.dateInfo.dates = {};
		r.dateInfo.dateArray = {};
		params.mixedKeys.forEach((item) => {
			const { key, levels } = item;
			let val = r.data;
			if (val != null) {
				levels.forEach((v) => {
					if ("date" in val) {
						r.dateInfo.dates[key] = val["date"];
						r.dateInfo.dateArray[key] = [];
						let date0 = new Date(r.dateInfo.dates[key].date0);
						let date1 = new Date(r.dateInfo.dates[key].date1);
						let currentDate = new Date(date0);
						while (currentDate <= new Date(date1)) {
							let formattedDate = this.formatDate(currentDate);
							r.dateInfo.dateArray[key].push(formattedDate);
							currentDate.setDate(currentDate.getDate() + 1);
						}
					}
					if (v in val) {
						val = val[v];
					}
				});
			}
		});

		let tempDatesArray = [];
		Object.keys(r.dateInfo.dates).forEach((key) => {
			tempDatesArray.push(new Date(r.dateInfo.dates[key].date0).getTime());
			tempDatesArray.push(new Date(r.dateInfo.dates[key].date1).getTime());
		});
		let dateMin = new Date(Math.min(...tempDatesArray));
		let dateMax = new Date(Math.max(...tempDatesArray));
		r.dateInfo.dateArray["total"] = [];
		let currentDate = new Date(dateMin);
		while (currentDate <= new Date(dateMax)) {
			let formattedDate = this.formatDate(currentDate);
			r.dateInfo.dateArray["total"].push(formattedDate);
			currentDate.setDate(currentDate.getDate() + 1);
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

	static handleBrushChangeY(range, scrlRef, dispatch, setBrushDatayDir) {
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
				setBrushDatayDir({
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
