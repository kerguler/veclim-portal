import { useDispatch } from "react-redux";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import { useFetchTimeSeriesDataQuery } from "store";
import RechartsPlot from "./RechartsPlot";
import { useEffect } from "react";
import { useState } from "react";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import MapAdjustmentsService from "components/charts/services/MapAdjustmentsService";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { useRef } from "react";
import useDirectorFun from "customHooks/useDirectorFun";
function UnifiedRechartPlotter({ dateArray, direction }) {
	const {
		vectorName,
		chartParameters,
		appendToColorsChartParametersDir,
		mapPagePosition,
		setMapPagePositionDir,
		appendToLabelsChartParametersDir,
		appendToPlottedKeysChartParametersDir,
		spliceChartParametersForSlicesDir,
	} = useDirectorFun(direction);

	const dispatch = useDispatch();
	console.log("UnifiedRechartPlotter");
	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName: vectorName,
		dateArray: dateArray,
	});
	const rawData = useRef({
		slice1: null,
		slice2: null,
		slice3: null,
		rawDataToPlot: { key: null },
		dateArray: [],
		data: null,
		dataToPlot: null,
	});
	let r = rawData.current;
	useEffect(() => {
		if (!mapPagePosition) {
			if (vectorName === "albopictus") {
				dispatch(
					setMapPagePositionDir(MapAdjustmentsService.defaultWorldCenter)
				);
			} else {
				dispatch(setMapPagePositionDir(MapAdjustmentsService.defaultCypCenter));
			}
		}
	}, [vectorName, dispatch, mapPagePosition]);

	useEffect(() => {
		if (
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
	const errorMessage = mapPagePosition.lat && (
		<div className="error-container">
			<p>
				There is no data available for the position chosen lat:{" "}
				{mapPagePosition.lat.toFixed(2)} lng: {mapPagePosition.lng.toFixed(2)}{" "}
			</p>
		</div>
	);

	let renderLineChart;
	const [plotReady, setPlotReady] = useState(false);
	useEffect(() => {
		if (data) {
			r.data = data;
			console.log("DATA IS HERE");
			ChartCalculatorService.createDateArray(rawData, chartParameters);
			ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
			ChartCalculatorService.handleSlices(chartParameters, rawData);
			setPlotReady(true);
		} else {
			setPlotReady(false);
		}
	}, [data]);
	if (isFetching) {
		renderLineChart = <ChartLoadingSkeleton times={4}></ChartLoadingSkeleton>;
	} else if (error) {
		renderLineChart = errorMessage;
	} else if (Object.keys(chartParameters).length === 0) {
		return <div></div>;
	} else {
		if (!data || (vectorName === "papatasi" && !data["sim-ts"])) {
			return errorMessage;
		}
		if (
			!data ||
			(vectorName === "albopictus" && !data[chartParameters.initialSetting])
		) {
			return errorMessage;
		}

		// r.data = data;
		// console.log("DATA IS HERE");
		// ChartCalculatorService.createDateArray(rawData, chartParameters);
		// ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
		// ChartCalculatorService.handleSlices(chartParameters, rawData);

		renderLineChart = plotReady ? (
			<ErrorBoundary>
				<RechartsPlot
					direction={direction}
					plotMat={r.dataToPlot}
				></RechartsPlot>
			</ErrorBoundary>
		) : (
			<ChartLoadingSkeleton times={4}></ChartLoadingSkeleton>
		);
	}

	return renderLineChart;
}

export default UnifiedRechartPlotter;
