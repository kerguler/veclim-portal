import { useDispatch, useSelector } from "react-redux";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import {
	appendToColorsChartParameters,
	appendToLabelsChartParameters,
	appendToPlottedKeysChartParameters,
	setMapPagePosition,
	spliceChartParametersForSlices,
	useFetchTimeSeriesDataQuery,
} from "store";
import RechartsPlot from "./RechartsPlot";
import { useEffect } from "react";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import MapAdjustmentsService from "components/charts/services/MapAdjustmentsService";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { useRef } from "react";
function UnifiedRechartPlotter({ dateArray }) {
	const position = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const dispatch = useDispatch();
	const params = useSelector((state) => {
		return state.fetcher.fetcherStates.menu.left.chart.chartParameters;
	});

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(position),
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
		if (!position) {
			if (vectorName === "albopictus") {
				dispatch(setMapPagePosition(MapAdjustmentsService.defaultWorldCenter));
			} else {
				dispatch(setMapPagePosition(MapAdjustmentsService.defaultCypCenter));
			}
		}
	}, [vectorName, dispatch, position]);
	useEffect(() => {
		if (params.lineSlice?.length > 0 && !params.plottedKeys.includes("slice1")) {
			dispatch(appendToPlottedKeysChartParameters({direction:"left", value:"slice1"}));
			dispatch(appendToPlottedKeysChartParameters({direction:"left", value:"slice2"}));
			dispatch(appendToPlottedKeysChartParameters({direction:"left", value:"slice3"}));
			dispatch(appendToLabelsChartParameters({direction:"left", value:params.sliceLabels}));
			dispatch(appendToColorsChartParameters({direction:"left", value:params.sliceColors}));
			dispatch(spliceChartParametersForSlices({direction:"left", value:0}));
		}
	});
	const errorMessage = position.lat && (
		<div className="error-container">
			<p>
				There is no data available for the position chosen lat:{" "}
				{position.lat.toFixed(2)} lng: {position.lng.toFixed(2)}{" "}
			</p>
		</div>
	);

	let renderLineChart;

	if (isFetching) {
		renderLineChart = <ChartLoadingSkeleton times={4}></ChartLoadingSkeleton>;
	} else if (error) {
		renderLineChart = errorMessage;
	} else if (Object.keys(params).length === 0) {
		return <div></div>;
	} else {
		if (!data || (vectorName === "papatasi" && !data["sim-ts"])) {
			return errorMessage;
		}
		if (
			!data ||
			(vectorName === "albopictus" && !data[params.initialSetting])
		) {
			return errorMessage;
		}
		r.data = data;
		ChartCalculatorService.createDateArray(rawData, params);
		ChartCalculatorService.handleMixedKeys(rawData, params);
		ChartCalculatorService.handleSlices(params, rawData);

		renderLineChart = (
			<ErrorBoundary>
				<RechartsPlot plotMat={r.dataToPlot}></RechartsPlot>
			</ErrorBoundary>
		);
	}

	return renderLineChart;
}

export default UnifiedRechartPlotter;
