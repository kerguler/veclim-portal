import { useEffect } from "react";
import useDirectorFun from "customHooks/useDirectorFun";
import { useState } from "react";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import ErrorComponent from "../errorComponent/ErrorComponent";
import { useRef } from "react";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import { useFetchTimeSeriesDataQuery } from "store";
import RechartsPlot from "../RechartsPlot";
import { setMessenger } from "store";
import { useAlboData } from "context/AlboDataContext";
import useInvalidationData from "../customPlotterHooks/useInvalidationData";
import useArrangeDataSim from "../customPlotterHooks/useArrangeDataSim";
import useCheckChartParameters from "../customPlotterHooks/useCheckChartParameters";
function CustomSimulationChartV2({ direction }) {
	const {
		chartParameters,
		plotReady,
		messenger,
		dispatch,
		mapPagePosition,
		vectorName,
		dateArray,
	} = useDirectorFun("left");

	const { isLoadingSim, errorSim, simResult } = useAlboData();
	const {
		data: dataTs,
		error: errorTs,
		isFetching: isLoadingTs,
	} = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});

	const [alboDataArrived, setAlboDataArrived] = useState(false);

	const rawData = useRef({
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});
	useArrangeDataSim({
		rawData,
		dataTs,
		setAlboDataArrived,
		alboDataArrived,
		direction,
	});

	useCheckChartParameters();

	useEffect(() => {
		if (errorSim) {
			dispatch(
				setMessenger({
					direction,
					value: {
						isError: true,
						id: 0,
						message: "server responded with an error",
					},
				}),
			);
		}
	}, [errorSim]);

	let r = rawData.current;
	if (isLoadingSim) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Sumlation Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (messenger.message) {
		return <ErrorComponent text={messenger.message}></ErrorComponent>;
	} else if (Object.keys(chartParameters).length === 0) {
		console.log("chartParameters", chartParameters);
	} else {
		if (simResult) {
			return (
				plotReady && (
					<ErrorBoundary>
						<RechartsPlot
							direction='left'
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
}

export default CustomSimulationChartV2;
