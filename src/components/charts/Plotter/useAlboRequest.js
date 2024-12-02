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
	} = useDirectorFun("right");
	const [submitAlboData, { isLoading, data, error }] =
		useSubmitAlboDataMutation();
	// console.log({ alboRequest });

	const tsData = useSelector((state) => state.fetcher.fetcherStates.data);

	useEffect(() => {
		tsData && console.log({ tsData });
		if (Object.keys(tsData).length > 0) {
	
		}
	}, [tsData]);


	useEffect(() => {
		const handleConfirm = async () => {
			// console.log("Submitting Albo Data", alboSlider1Value / 100);
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
	}, [alboSlider1Value, alboRequest]);

	const alboDates = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.dates
	);
	useEffect(() => {
		let r = rawData.current;
		if (data) {
			r.data = {...data, ...tsData};
			
			console.log("ALBO DATA IS HERE",{data:r.data});
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
	}, [data,tsData]);

	useEffect(() => {
		// console.log({ AlboChartPars: chartParameters });
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
