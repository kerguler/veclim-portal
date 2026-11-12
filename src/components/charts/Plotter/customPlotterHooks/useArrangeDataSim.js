import { useEffect, useRef } from 'react';
import useDirectorFun from 'customHooks/useDirectorFun';
import ChartCalculatorService from 'components/charts/services/ChartCalculatorService';
import {
  setAlboRequestPlot,
  setSimSlider1Enabled,
  setPlotReady,
  setMessenger,
} from 'store';
import { useAlboData } from 'context/AlboDataContext';

function useArrangeDataSim({ rawData, dataTs, direction, onBuilt }) {
  const { simResult } = useAlboData();

  const {
    vectorName,
    chartParameters,
    invalidateSimData,
    dispatch,
    mapPagePosition,
  } = useDirectorFun(direction);

  const lastReadyRef = useRef(null); // null | true | false

  useEffect(() => {
    const r = rawData.current;

    // basic prereq checks
    const hasChartParams =
      chartParameters && Object.keys(chartParameters).length > 0;
    const canBuild =
      vectorName === 'albopictus' && !!simResult && !!dataTs && hasChartParams;

    // ✅ if we can't build, only dispatch when this is a CHANGE
    if (!canBuild) {
      if (lastReadyRef.current !== false) {
        lastReadyRef.current = false;
        dispatch(setPlotReady({ direction, value: false }));
      }
      return;
    }

    // ✅ canBuild === true: do the heavy work once per change set
    try {
      r.data = { ...simResult, ts: dataTs };

      const { errorMessage, isError, unavailableKeys } =
        ChartCalculatorService.checkDataForMixedKeys(
          chartParameters,
          r.data,
          dispatch,
          setPlotReady,
          mapPagePosition,
          direction
        );
      if (isError) {
        const noData = new Error(errorMessage);
        noData.isNoData = true;
        throw noData;
      }

      const effectiveChartParameters =
        unavailableKeys && unavailableKeys.length > 0
          ? {
              ...chartParameters,
              mixedKeys: chartParameters.mixedKeys.filter(
                (element) => !unavailableKeys.includes(element.key)
              ),
            }
          : chartParameters;

      ChartCalculatorService.createDateArray(rawData, effectiveChartParameters);
      ChartCalculatorService.handleMixedKeys(rawData, effectiveChartParameters);
      ChartCalculatorService.handleSlices(rawData, effectiveChartParameters);

      if (lastReadyRef.current !== true) {
        lastReadyRef.current = true;
        dispatch(setPlotReady({ direction, value: true }));
      }

      dispatch(
        setMessenger({
          direction,
          value: { id: null, message: null, isError: false },
        })
      );
      dispatch(setAlboRequestPlot(false));
      dispatch(setSimSlider1Enabled({ direction, value: true }));
      onBuilt?.();
    } catch (err) {
      // Only set messenger once per failure state (optional guard)
      if (lastReadyRef.current !== false) {
        lastReadyRef.current = false;
        dispatch(setPlotReady({ direction, value: false }));
      }
      dispatch(
        setMessenger({
          direction,
          value: {
            id: 5,
            isError: true,
            message: err?.isNoData
              ? err.message
              : "We couldn't draw the chart for this simulation. Try running it again, or pick a different location.",
          },
        })
      );
    }
  }, [
    invalidateSimData,
    direction,
    vectorName,
    simResult,
    dataTs,
    dispatch,
    mapPagePosition?.lat, // ✅ use primitives if possible
    mapPagePosition?.lon,
    // chartParameters is still an object; see note below
    chartParameters,
  ]);
}

export default useArrangeDataSim;
