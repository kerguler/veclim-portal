import { useSelector } from 'react-redux';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFetchTimeSeriesDataQuery } from 'store';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import { useAlboData } from 'context/AlboDataContext';
import TsRequestV2 from './TsRequestV2';
import CustomSimulationChartV2 from './CustomSimulationChartV2';

function UnifiedRechartPlotterV2({ direction }) {
	const { mapPagePosition, vectorName, dateArray } =
		useDirectorFun(direction);

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});
	const { dataSim, isLoadingSim, errorSim, simResult } = useAlboData();
	const graphType = useSelector(
		(state) => state.fetcher.fetcherStates.graphType,
	);
	const [displayedPanel, setDisplayedPanel] = useState(null);
	useEffect(() => {
		if (graphType === 'sim') {
			setDisplayedPanel('sim');
		} else {
			setDisplayedPanel('ts');
		}
	}, [graphType]);

	if (simResult && graphType === null) {
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
		if (graphType === 'sim' && displayedPanel === 'sim') {
			return <CustomSimulationChartV2 direction={direction} />;
		} else if (graphType === 'ts' && displayedPanel === 'ts') {
			return <TsRequestV2 direction={direction} />;
		}
	} else {
		return <div>error</div>;
	}
}

export default UnifiedRechartPlotterV2;
