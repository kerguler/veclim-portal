import TsRequest from "../TsRequest";
import AlboRequest from "../AlboRequest";
import { useSelector } from "react-redux";
import useDirectorFun from "customHooks/useDirectorFun";
import { useState } from "react";
import { useEffect } from "react";
import CustomSimulationChart from "../CustomSimulationChart";
import { useFetchTimeSeriesDataQuery } from "store";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import { useAlboData } from "context/AlboDataContext";
import TsRequestV2 from "./TsRequestV2";
import CustomSimulationChartV2 from "./CustomSimulationChartV2";

function UnifiedRechartPlotterV2({ direction }) {
	const {
		panelDataDir: panelData,
		mapPagePosition,
		vectorName,
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
	const [displayedPanel, setDisplayedPanel] = useState(null);
	useEffect(() => {
		if (graphType === "sim") {
			setDisplayedPanel("sim");
		} else {
			setDisplayedPanel("ts");
		}
	}, [graphType]);

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
		if (graphType === "sim" && displayedPanel === "sim") {
			console.log("calling CustomSimulationChartV2");
			return <CustomSimulationChartV2 />;
		} else if (graphType === "ts" && displayedPanel === "ts") {
			console.log("calling TsRequestV2");

			return <TsRequestV2 />;
		}
	} else {
		return <div>error</div>;
	}
}

export default UnifiedRechartPlotterV2;
