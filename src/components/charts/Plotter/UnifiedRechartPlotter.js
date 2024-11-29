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
function UnifiedRechartPlotter({ dateArray, direction }) {
	const {
		chartParameters,
		mapPagePosition,
		plotReady,
	} = useDirectorFun(direction);

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

	const { dataTs, isFetchingTs, errorTs } = useTsRequest(rawData, direction);
	const { dataAlbo, isFetchingAlbo, errorAlbo } = useAlboRequest(
		rawData,
		direction
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


	if (isFetchingTs || isFetchingAlbo) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Graphics Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (errorTs || errorAlbo) {
		return errorMessage;
	} else if (Object.keys(chartParameters).length === 0) {
		return <div></div>;
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
	if (dataTs || dataAlbo) {
		return (
			plotReady && (
				<ErrorBoundary>
					<RechartsPlot
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
