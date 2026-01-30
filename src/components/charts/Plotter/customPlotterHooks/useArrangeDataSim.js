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

function useArrangeDataSim({ rawData, dataTs, direction }) {
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

      const { errorMessage, isError } =
        ChartCalculatorService.checkDataForMixedKeys(
          chartParameters,
          r.data,
          dispatch,
          setPlotReady,
          mapPagePosition,
          direction
        );
      console.log("error checkData for Mixed keys", { errorMessage, isError });
      if (isError) throw new Error(errorMessage);

      ChartCalculatorService.createDateArray(rawData, chartParameters);
      ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
      ChartCalculatorService.handleSlices(rawData, chartParameters);

      if (lastReadyRef.current !== true) {
        lastReadyRef.current = true;
        dispatch(setPlotReady({ direction, value: true }));
      }

      dispatch(setAlboRequestPlot(false));
      dispatch(setSimSlider1Enabled({ direction, value: true }));
    } catch (err) {
      // Only set messenger once per failure state (optional guard)
      if (lastReadyRef.current !== false) {
        lastReadyRef.current = false;
        dispatch(setPlotReady({ direction, value: false }));
      }
      console.log('cuaght error in useArrangeDataSim:', err);
      dispatch(
        setMessenger({
          direction,
          value: {
            id: 5,
            isError: true,
            message:
              'Something went wrong when dealing with data in simulation',
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

// import useDirectorFun from 'customHooks/useDirectorFun';
// import { useEffect } from 'react';
// import ChartCalculatorService from 'components/charts/services/ChartCalculatorService';
// import { setAlboRequestPlot, setSimSlider1Enabled } from 'store';
// import { useAlboData } from 'context/AlboDataContext';
// import { setPlotReady } from 'store';
// import { setMessenger } from 'store';

// function useArrangeDataSim({
//   rawData,
//   dataTs,

//   setAlboDataArrived,
//   alboDataArrived,
//   direction,
// }) {
//   const { simResult } = useAlboData();
//   const {
//     vectorName,
//     chartParameters,
//     invalidateSimData,
//     dispatch,
//     mapPagePosition,
//     messenger,
//   } = useDirectorFun(direction);

//   useEffect(() => {
//     let r = rawData.current;
//     try {
//       if (vectorName === 'albopictus') {
//         if (
//           simResult &&
//           dataTs &&
//           chartParameters &&
//           Object.keys(chartParameters).length > 0
//         ) {
//           if (simResult) {
//             r.data = { ...simResult };
//             r.data['ts'] = dataTs;

//             const { errorMessage, isError } =
//               ChartCalculatorService.checkDataForMixedKeys(
//                 chartParameters,
//                 r.data,
//                 dispatch,
//                 setPlotReady,
//                 mapPagePosition,
//                 direction
//               );

//             if (isError) {
//               throw new Error(errorMessage);
//             }
//             ChartCalculatorService.createDateArray(rawData, chartParameters);
//             ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
//             ChartCalculatorService.handleSlices(rawData, chartParameters);
//             dispatch(setPlotReady({ direction, value: true }));
//             dispatch(setAlboRequestPlot(false));
//             dispatch(setSimSlider1Enabled({ direction, value: true }));
//             // setPlotReady({ direction, value: true });
//           }
//         } else {
//           console.log({
//             simResult,
//             dataTs,
//             chartParameters,
//             chartParLen: Object.keys(chartParameters).length > 0,
//           });
//           console.log('shouldnt have come here');
//           dispatch(setPlotReady({ direction, value: false }));
//         }
//       } else {
//         dispatch(
//           setMessenger({
//             direction,
//             value: {
//               id: 3,
//               isError: true,
//               message: 'The panel doesnt work for this vector',
//             },
//           })
//         );
//       }
//     } catch (err) {
//       dispatch(
//         setMessenger({
//           direction,
//           value: {
//             id: 5,

//             message:
//               'something went wrong when dealing with data in simulation',
//           },
//         })
//       );
//     }
//   }, [
//     invalidateSimData,
//     chartParameters,
//     simResult,
//     dispatch,
//     alboDataArrived,
//     rawData,
//     vectorName,
//     dataTs,
//     setPlotReady,
//     mapPagePosition,
//     setMessenger,
//     messenger,
//     setAlboDataArrived,
//   ]);
// }

// export default useArrangeDataSim;
