import { useDispatch } from "react-redux";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import RechartsPlot from "./RechartsPlot";
import { useEffect } from "react";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useRef } from "react";
import useDirectorFun from "customHooks/useDirectorFun";
import useAlboRequest from "./useAlboRequest";
import useTsRequest from "./useTsRequest";
import { useState } from "react";
import RechartsUnified from "./RechartsUnified";
function UnifiedRechartPlotter({ dateArray, direction }) {
	const { chartParameters, mapPagePosition, plotReady } =
		useDirectorFun(direction);

	const rawData = useRef({
		chartParameters: chartParameters,
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});
	let r = rawData.current;

	const { dataTs, isFetchingTs, errorTs } = useTsRequest(
		rawData,
		direction,

		plotReady
	);
	const { dataAlbo, isFetchingAlbo, errorAlbo } = useAlboRequest(
		rawData,
		direction,

		plotReady
	);

	const isFetching = direction === "left" ? isFetchingTs : isFetchingAlbo;
	const error = direction === "left" ? errorTs : errorAlbo;
	const data = direction === "left" ? dataTs : dataAlbo;
	const errorMessageAlbo = (
		<div className="error-container">
			<p>the Map position has changed since the last simulation</p>
		</div>
	);
	const errorMessage = mapPagePosition.lat ? (
		<div className="error-container">
			<p>
				There is no data available for the position chosen lat:{" "}
				{mapPagePosition.lat.toFixed(2)} lng: {mapPagePosition.lng.toFixed(2)}{" "}
			</p>
		</div>
	) : (
		<div className="error-container">
			{" "}
			<p> you may need to click on map to choose a location</p>
		</div>
	);

	if (isFetching) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Graphics Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (error) {
		if (error === 1) {
			return errorMessageAlbo;
		}
		if (error === 2) {
			return (
				<div class name="error-container">
					<p> Waiting for TS data to arrive</p>
				</div>
			);
		}
		if (error === 3) {
			return (
				<div className="error-container">
					{" "}
					<p>
						Ts data has changed, click submit to receive results for the new
						coordinates
					</p>
				</div>
			);
		}
		return errorMessage;
	} else if (Object.keys(chartParameters).length === 0) {
		return (
			<div className="error-container">
				<p>the chart parameters are not set yet</p>{" "}
			</div>
		);
	} else {
		if (direction === "right") {
			if (!dataAlbo || !dataAlbo[chartParameters.initialSetting]) {
				return (
					<div>
						<p>
							Click on the map to choose a location and adjust the parameters
						</p>
					</div>
				);
			}
			if (dataAlbo) {
				r.data = dataAlbo;
			}
		}
	}
	if (data) {
		return (
			plotReady && (
				<ErrorBoundary>
					<RechartsPlot
						chartParameters={chartParameters}
						direction={direction}
						plotMat={r.dataToPlot}
					></RechartsPlot>
				</ErrorBoundary>
			)
		);
	} else {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>trying yo figure things out</p>
			</ChartLoadingSkeleton>
		);
	}
}

export default UnifiedRechartPlotter;
