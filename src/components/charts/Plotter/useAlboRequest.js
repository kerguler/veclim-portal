import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSubmitAlboDataMutation } from "store";
import { setAlboRequestPlot } from "store";
import ChartCalculatorService from "components/charts/services/ChartCalculatorService";
import useDirectorFun from "customHooks/useDirectorFun";
import { setSlider1EnabledRight } from "store";
import { useState } from "react";
import { setIsTsDataSet } from "store";
function useAlboRequest(rawData, direction, plotReady) {
	const dispatch = useDispatch();
	const alboSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.value
	);
	const alboRequest = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.requestPlot
	);
	const {
		setPlotReadyDir,
		chartParameters,
		appendToPlottedKeysChartParametersDir,
	} = useDirectorFun("right");

	const [submitAlboData, { isLoading, data, error }] =
		useSubmitAlboDataMutation();
	const isTsDataSet = useSelector(
		(state) => state.fetcher.fetcherStates.isTsDataSet
	);
	const tsData = useSelector((state) => state.fetcher.fetcherStates.data);
	const [customError, setCustomError] = useState(0);

	const mapPagePositionLeft = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);

	useEffect(() => {
		let r = rawData.current;
		if (isTsDataSet) setCustomError(3);
		// setCustomError(1);
	}, [mapPagePositionLeft, isTsDataSet, tsData]);

	useEffect(() => {
		const handleConfirm = async () => {
			try {
				const response = await submitAlboData(alboSlider1Value / 100).unwrap();
			} catch (err) {
				console.log(err);
			}
		};
		if (alboRequest && direction === "right") {
			handleConfirm();
			setCustomError(false);
		}
	}, [alboSlider1Value, alboRequest]);
	const alboDates = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.dates
	);
	useEffect(() => {
		let r = rawData.current;
		data && dispatch(setIsTsDataSet(false));
		if (tsData && !isTsDataSet && Object.keys(chartParameters).length > 0) {
			if (data) {
				r.data = { ...data };
				r.data["ts"] = tsData;
				console.log({ rinAlbo: r });
				ChartCalculatorService.createDateArrayAlbo(rawData, chartParameters);
				ChartCalculatorService.handleMixedKeysAlbo(rawData, chartParameters);
				ChartCalculatorService.handleSlicesAlbo(chartParameters, rawData);
				dispatch(setPlotReadyDir(true));
				dispatch(setAlboRequestPlot(false));
				dispatch(setSlider1EnabledRight(true));
				setCustomError(null);
			} else {
				dispatch(setPlotReadyDir(false));
			}
		} else {
			isTsDataSet ? setCustomError(3) : setCustomError(2);
		}
	}, [chartParameters, data, dispatch, tsData, isTsDataSet, plotReady]);

	useEffect(() => {
		let r = rawData.current;
		if (
			direction === "right" &&
			r.dataToPlot &&
			chartParameters.lineSlice &&
			chartParameters.lineSlice.length > 0 &&
			!chartParameters.plottedKeys.includes("slice1")
		) {
			Object.keys(r.rawDataToPlot).forEach((element, index) => {
				if (element !== "key") {
					if (
						r.rawDataToPlot[element] &&
						r.rawDataToPlot[element].slices &&
						Object.keys(r.rawDataToPlot[element].slices).length > 0
					) {
						Object.keys(r.rawDataToPlot[element].slices).forEach(
							(slice, index) => {
								dispatch(
									appendToPlottedKeysChartParametersDir(
										`${element}.slice${index}`
									)
								);
							}
						);
					}
				}
			});
		}
	}, [plotReady]);

	return {
		dataAlbo: data,
		errorAlbo: error || customError,
		isFetchingAlbo: isLoading,
	};
}

export default useAlboRequest;
