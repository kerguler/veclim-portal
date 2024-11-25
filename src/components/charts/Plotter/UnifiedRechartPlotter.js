import { useDispatch } from "react-redux";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import { useFetchTimeSeriesDataQuery } from "store";
import RechartsPlot from "./RechartsPlot";
import { useEffect } from "react";
import { useState } from "react";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import MapAdjustmentsService from "components/charts/services/MapAdjustmentsService";
import { useRef } from "react";
import useDirectorFun from "customHooks/useDirectorFun";
import useAlboRequest from "./useAlboRequest";
import useTsRequest from "./useTsRequest";
import AlboPlot from "./AlboPlot";
function UnifiedRechartPlotter({ dateArray, direction }) {
	const {
		vectorName,
		chartParameters,

		mapPagePosition,
		setMapPagePositionDir,
		plotReady,
	} = useDirectorFun(direction);
	const dispatch = useDispatch();

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
	let renderLineChart;

	const { dataTs, isFetchingTs, errorTs } = useTsRequest(rawData, direction);
	const { dataAlbo, isFetchingAlbo, errorAlbo } = useAlboRequest(
		rawData,
		direction
	);
	let data, isFetching, error;

	if (direction === "right") {
		data = dataAlbo;
		isFetching = isFetchingAlbo;
		error = errorAlbo;
	} else {
		console.log("direction left detected");
		data = dataTs;
		isFetching = isFetchingTs;
		error = errorTs;
	}

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

	const errorMessage = mapPagePosition.lat && (
		<div className="error-container">
			<p>
				There is no data available for the position chosen lat:{" "}
				{mapPagePosition.lat.toFixed(2)} lng: {mapPagePosition.lng.toFixed(2)}{" "}
			</p>
		</div>
	);
	if (isFetching) {
		renderLineChart = <ChartLoadingSkeleton times={4}></ChartLoadingSkeleton>;
	} else if (error) {
		renderLineChart = errorMessage;
	} else if (Object.keys(chartParameters).length === 0) {
		return <div></div>;
	} else {
		if (direction === "left") {
			console.log({ data, chartParameters });

			if (!data || (vectorName === "papatasi" && !data["sim-ts"])) {
				return errorMessage;
			}
			if (
				!data ||
				(vectorName === "albopictus" && !data[chartParameters.initialSetting])
			) {
				return errorMessage;
			}
		}
		if (direction === "right") {
			console.log({ direction, data, chartParameters });
			if (!data || !data[chartParameters.initialSetting]) {
				return <div>Something happening there</div>;
			}
			if (data) {
				r.data = data;
			}
		}
	}
	console.log({ plotReady });
	renderLineChart = plotReady ? (
		<ErrorBoundary>
			<RechartsPlot direction={direction} plotMat={r.dataToPlot}></RechartsPlot>
		</ErrorBoundary>
	) : (
		<ChartLoadingSkeleton times={4}></ChartLoadingSkeleton>
	);

	return renderLineChart;
}

export default UnifiedRechartPlotter;
