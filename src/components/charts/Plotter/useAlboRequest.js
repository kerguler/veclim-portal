import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSubmitAlboDataMutation } from "store";
import { setAlboRequestPlot } from "store";
import ChartCalculatorService from "components/charts/services/ChartCalculatorService";
import useDirectorFun from "customHooks/useDirectorFun";
import { setSlider1EnabledRight } from "store";
import { useState } from "react";
function useAlboRequest(rawData, direction) {
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
		appendToColorsChartParametersDir,
		appendToLabelsChartParametersDir,
		appendToPlottedKeysChartParametersDir,
		spliceChartParametersForSlicesDir,
		mapPagePosition,
		plotReady,
	} = useDirectorFun("right");

	const [submitAlboData, { isLoading, data, error }] =
		useSubmitAlboDataMutation();

	const tsData = useSelector((state) => state.fetcher.fetcherStates.data);
	const [customError, setCustomError] = useState(0);

	const mapPagePositionLeft = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);
	useEffect(() => {
		setCustomError(1);
	}, [mapPagePositionLeft]);

	useEffect(() => {
		const handleConfirm = async () => {
			try {
				const response = await submitAlboData(alboSlider1Value / 100).unwrap();
			} catch (err) {}
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
		if (tsData) {
			if (data) {
				r.data = { ...data, ...tsData };

				ChartCalculatorService.createDateArrayAlbo(
					rawData,
					chartParameters,
					alboDates
				);
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
			setCustomError(2);
		}
	}, [alboDates, chartParameters, data, dispatch, tsData]);

	useEffect(() => {
		let r = rawData.current;
		if (
			direction === "right" &&
			r.dataToPlot &&
			chartParameters.lineSlice &&
			chartParameters.lineSlice.length > 0 &&
			!chartParameters.plottedKeys.includes("slice1")
		) {
			console.log("eneterd the loop");
			console.log({ rINAPpend: r });
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

			dispatch(
				appendToLabelsChartParametersDir(chartParameters.sliceLabelsAlbo)
			);
			dispatch(
				appendToColorsChartParametersDir(chartParameters.sliceColorsAlbo)
			);
			dispatch(appendToLabelsChartParametersDir(chartParameters.sliceLabels));
			dispatch(appendToColorsChartParametersDir(chartParameters.sliceColors));
			dispatch(spliceChartParametersForSlicesDir(0));
			dispatch(spliceChartParametersForSlicesDir(1));
		}
		console.log({ chartParametersINAPpend: chartParameters });
	}, [plotReady]);

	return {
		dataAlbo: data,
		errorAlbo: error || customError,
		isFetchingAlbo: isLoading,
	};
}

export default useAlboRequest;
