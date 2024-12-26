import TsRequest from "./TsRequest";
import AlboRequest from "./AlboRequest";
import { useSelector } from "react-redux";
import useDirectorFun from "customHooks/useDirectorFun";
import { useState } from "react";
import { useEffect } from "react";
import CustomSimulationChart from "./CustomSimulationChart";
import { useFetchTimeSeriesDataQuery } from "store";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import { useAlboData } from "context/AlboDataContext";

function UnifiedRechartPlotter({ direction }) {
	const {
		displayedPanelID,
		panelDataDir,
		dataArrivedRight,
		displayedIcons,
		mapPagePosition,
		vectorName,
		twinIndex,
		dateArray,
	} = useDirectorFun(direction);

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});
	const { dataSim, isLoadingSim, errorSim } = useAlboData();
	const graphType = useSelector(
		(state) => state.fetcher.fetcherStates.graphType
	);
	console.log({ graphType });


	if (dataSim && graphType === null) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Making Calculations </p>
			</ChartLoadingSkeleton>
		);
	}
	if (isFetching) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Time Series Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (isLoadingSim) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Simulation Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (data) {
		if (graphType === "sim") {
			console.log("albo");
			return <CustomSimulationChart />;
		} else {
			console.log("ts");
			return <TsRequest />;
		}
	} else {
		return <div>error</div>;
	}
}

export default UnifiedRechartPlotter;
