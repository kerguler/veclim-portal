import useDirectorFun from "customHooks/useDirectorFun";
import { useFetchTimeSeriesDataQuery } from "store";
import { useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { useDispatch } from "react-redux";
function useTsRequest(rawData, direction) {
	const dispatch = useDispatch();

	const {
		appendToColorsChartParametersDir,
		appendToLabelsChartParametersDir,
		appendToPlottedKeysChartParametersDir,
		spliceChartParametersForSlicesDir,
		mapPagePosition,
		vectorName,
		dateArray,
		setPlotReadyDir,
		chartParameters,
	} = useDirectorFun("left");
	console.log({ in_useTs: direction });
	const { data, error, isFetching } = useFetchTimeSeriesDataQuery(
		direction === "left"
			? {
					position: JSON.stringify(mapPagePosition),
					vectorName: vectorName,
					dateArray: dateArray,
			  }
			: skipToken
	);
	useEffect(() => {
		let r = rawData.current;
		if (data && direction === "left") {
			r.data = data;
			console.log("TS DATA IS HERE");
			ChartCalculatorService.createDateArray(rawData, chartParameters);
			ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
			ChartCalculatorService.handleSlices(chartParameters, rawData);
			dispatch(setPlotReadyDir(true));
		} else {
			dispatch(setPlotReadyDir(false));
		}
	}, [data]);

	useEffect(() => {
		console.log({ TSChartPars: chartParameters });
		if (
			chartParameters.lineSlice &&
			chartParameters.lineSlice.length > 0 &&
			!chartParameters.plottedKeys.includes("slice1")
		) {
			dispatch(appendToPlottedKeysChartParametersDir("slice1"));
			dispatch(appendToPlottedKeysChartParametersDir("slice2"));
			dispatch(appendToPlottedKeysChartParametersDir("slice3"));
			dispatch(appendToLabelsChartParametersDir(chartParameters.sliceLabels));
			dispatch(appendToColorsChartParametersDir(chartParameters.sliceColors));
			dispatch(spliceChartParametersForSlicesDir(0));
		}
	});

	return { dataTs: data, errorTs: error, isFetchingTs: isFetching };
}

export default useTsRequest;
