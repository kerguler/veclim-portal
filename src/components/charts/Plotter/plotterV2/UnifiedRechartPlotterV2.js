import { useSelector } from 'react-redux';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFetchTimeSeriesDataQuery } from 'store';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import { useAlboData } from 'context/AlboDataContext';
import TsRequest from './TsRequest';
import CustomSimulationChartV2 from './CustomSimulationChart';
import ErrorComponent from '../errorComponent/ErrorComponent';

function UnifiedRechartPlotterV2({ direction }) {
  const { mapPagePosition, vectorName, dateArray } = useDirectorFun(direction);
  const hasValidPoint =
    mapPagePosition?.lat !== null &&
    mapPagePosition?.lng !== null &&
    mapPagePosition?.lat !== undefined &&
    mapPagePosition?.lng !== undefined;

  const { data, error, isFetching, refetch } = useFetchTimeSeriesDataQuery(
    {
      position: mapPagePosition,
      vectorName,
      dateArray,
    },
    {
      skip: !hasValidPoint,
    }
  );
  const { dataSim, isLoadingSim, errorSim, simResult } = useAlboData();
  const graphType = useSelector(
    (state) => state.fetcher.fetcherStates.graphType
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
  } else if (error) {
    // error was being fetched but never read before - a real fetch failure
    // always fell through to the generic "no data" case below and showed a
    // bare "error" with no way to recover.
    return (
      <ErrorComponent
        text="Couldn't load this chart. Check your connection and try again."
        onRetry={refetch}
      />
    );
  } else if (data) {
    if (graphType === 'sim' && displayedPanel === 'sim') {
      return <CustomSimulationChartV2 direction={direction} />;
    } else if (graphType === 'ts' && displayedPanel === 'ts') {
      return <TsRequest direction={direction} />;
    }
    // graphType/displayedPanel haven't synced up yet for one render - show
    // a skeleton instead of rendering nothing for that frame.
    return (
      <ChartLoadingSkeleton times={4}>
        <p>Preparing chart…</p>
      </ChartLoadingSkeleton>
    );
  } else {
    // No error, no data, not fetching: nothing requested yet (no point
    // clicked) - not a failure.
    return (
      <div className="chart-hint">Click on the map to see this chart.</div>
    );
  }
}

export default UnifiedRechartPlotterV2;
