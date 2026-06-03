import { useEffect, useMemo, useRef, useState } from 'react';
import useDirectorFun from 'customHooks/useDirectorFun';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import ErrorComponent from '../errorComponent/ErrorComponent';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import { useFetchTimeSeriesDataQuery, setMessenger } from 'store';
import { useAlboData } from 'context/AlboDataContext';
import useArrangeDataSim from '../customPlotterHooks/useArrangeDataSim';
import useCheckChartParameters from '../customPlotterHooks/useCheckChartParameters';
import RechartsPlot from '../RechartsPlot';

function CustomSimulationChart({ direction }) {
  const {
    chartParameters,
    plotReady,
    messenger,
    dispatch,
    mapPagePosition,
    vectorName,
    dateArray,
  } = useDirectorFun(direction); // <- use passed direction, not hardcoded 'left'

  const { isLoadingSim, errorSim, simResult } = useAlboData();

  const hasValidPosition =
    Number.isFinite(mapPagePosition?.lat) &&
    Number.isFinite(mapPagePosition?.lng);

  const {
    data: dataTs,
    error: errorTs,
    isFetching: isLoadingTs,
  } = useFetchTimeSeriesDataQuery(
    {
      position: mapPagePosition,
      vectorName,
      dateArray,
    },
    {
      skip: !hasValidPosition,
    }
  );

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

  // ✅ normalize success across payload shapes
  const success = useMemo(() => {
    if (!simResult) return null;
    return simResult.success ?? simResult.info?.success ?? null;
  }, [simResult]);

  useEffect(() => {
    if (!errorSim) return;
    dispatch(
      setMessenger({
        direction,
        value: {
          isError: true,
          id: 0,
          message: 'Server responded with an error',
        },
      })
    );
  }, [errorSim, dispatch, direction]);

  // -------------------------
  // ✅ Stable early returns
  // -------------------------

  if (isLoadingSim || isLoadingTs) {
    return (
      <ChartLoadingSkeleton times={4}>
        <p>Fetching simulation data</p>
      </ChartLoadingSkeleton>
    );
  }

  if (errorSim || errorTs) {
    return (
      <ErrorComponent text="Data could not be fetched. Please try again." />
    );
  }

  // Messenger state (your app-level errors)
  if (messenger?.message) {
    return <ErrorComponent text={messenger.message} />;
  }

  // No params selected yet
  if (!chartParameters || Object.keys(chartParameters).length === 0) {
    return <ErrorComponent text="Please select chart parameters." />;
  }

  // ✅ The case you asked for: success=0
  if (success === 0) {
    return (
      <ErrorComponent text="No simulation results found for the selected inputs." />
    );
    // or just: return <div>No simulation results found</div>;
  }

  // Still waiting for result object itself
  if (!simResult) {
    return (
      <ChartLoadingSkeleton times={4}>
        <p>Preparing chart…</p>
      </ChartLoadingSkeleton>
    );
  }

  // Chart rendering
  const r = rawData.current;

  return plotReady ? (
    <ErrorBoundary>
      <RechartsPlot direction={direction} plotMat={r.dataToPlot} />
    </ErrorBoundary>
  ) : (
    <ChartLoadingSkeleton times={2}>
      <p>Preparing plot…</p>
    </ChartLoadingSkeleton>
  );
}

export default CustomSimulationChart;

