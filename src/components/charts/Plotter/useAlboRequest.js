import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSubmitAlboDataMutation } from "store";
import { setAlboRequestPlot } from "store";
import ChartCalculatorService from "components/charts/services/ChartCalculatorService";
import useDirectorFun from "customHooks/useDirectorFun";
import { setSlider1EnabledRight } from "store";
function useAlboRequest(rawData, direction) {
	const dispatch = useDispatch();
	const alboSlider1Value = useSelector(
		(state) => state.fetcher.fetcherStates.map.alboParams.sliderValue
	);
	const alboRequest = useSelector(
		(state) => state.fetcher.fetcherStates.chart.right.requestPlot
	);
	const {
		setPlotReadyDir,
		chartParameters,
		appendToColorsChartParametersDir,
		appendToLabelsChartParametersDir,
		appendToPlottedKeysChartParametersDir,
		spliceChartParametersForSlicesDir,
	} = useDirectorFun("right");
	const [submitAlboData, { isLoading, data, error }] =
		useSubmitAlboDataMutation();
	console.log({ alboRequest });

	useEffect(() => {
		const handleConfirm = async () => {
			console.log("Submitting Albo Data", alboSlider1Value / 100);
			try {
				const response = await submitAlboData(alboSlider1Value / 100).unwrap();
				console.log("Success:", response);
			} catch (err) {
				console.error("Error:", err);
			}
		};
		if (alboRequest && direction === "right") {
			console.log("dealing with albo request");
			handleConfirm();
			// dispatch(setAlboRequestPlot(false));
		}
	}, [alboRequest]);

	const alboDates = useSelector(
		(state) => state.fetcher.fetcherStates.chart.right.dates
	);
	useEffect(() => {
		let r = rawData.current;
		if (data) {
			r.data = data;
			console.log("ALBO DATA IS HERE");
			ChartCalculatorService.createDateArrayAlbo(
				rawData,
				chartParameters,
				alboDates
			);
			console.log({ alboR: r });
			ChartCalculatorService.handleMixedKeysAlbo(rawData, chartParameters);
			console.log({ alboParams: chartParameters });
			ChartCalculatorService.handleSlicesAlbo(chartParameters, rawData);
			dispatch(setPlotReadyDir(true));
			dispatch(setAlboRequestPlot(false));
			dispatch(setSlider1EnabledRight(true));
		} else {
			dispatch(setPlotReadyDir(false));
		}
	}, [data]);

	useEffect(() => {
		console.log({ AlboChartPars: chartParameters });
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

	return { dataAlbo: data, errorAlbo: error, isFetchingAlbo: isLoading };
}

export default useAlboRequest;
