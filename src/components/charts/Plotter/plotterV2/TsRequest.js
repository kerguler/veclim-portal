import useDirectorFun from 'customHooks/useDirectorFun';
import { useFetchTimeSeriesDataQuery } from 'store';
import { useEffect, useRef } from 'react';
import ChartCalculatorService from 'components/charts/services/ChartCalculatorService';
import RechartsPlot from '../RechartsPlot';
import ErrorComponent from '../errorComponent/ErrorComponent';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import ChartLoadingSkeleton from 'components/skeleton/Skeleton';
import { setPlotReady } from 'store';
import { setBrushRange } from 'store';
import { setMessenger } from 'store';
import { useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';

function TsRequest({ direction }) {
  const dispatch = useDispatch();

  const rawData = useRef({
    rawDataToPlot: {},
    data: null,
    dataToPlot: null,
  });
  let r = rawData.current;
  // This side effect arrangtes the map centers to default values
  // in case the mapVector changes

  const {
    mapPagePosition,
    mapVector,
    dateArray,
    chartParameters,
    plotReady,

    messenger,
  } = useDirectorFun(direction);

  const hasValidPoint =
    mapPagePosition?.lat != null && mapPagePosition?.lng != null;

  const queryArg = hasValidPoint
    ? {
        position: { lat: mapPagePosition.lat, lng: mapPagePosition.lng },
        vectorName: mapVector,
        dateArray,
      }
    : skipToken;

  const { data, error, isFetching } = useFetchTimeSeriesDataQuery(queryArg);

  useEffect(() => {
    plotReady && dispatch(setPlotReady({ direction, value: false }));
  }, [mapVector, dispatch, setPlotReady]);

  useEffect(() => {
    let r = rawData.current;

    try {
      if (
        !isFetching &&
        data &&
        Object.keys(chartParameters).length > 0 &&
        mapPagePosition.lat
      ) {
        const { errorMessage, isError, unavailableKeys } =
          ChartCalculatorService.checkDataForMixedKeys(
            chartParameters,
            data,
            dispatch,
            setPlotReady,
            mapPagePosition,
            direction
          );
        if (isError) {
          console.log('shouldnt have come here');
          dispatch(
            setMessenger({
              direction,
              value: { id: 0, message: errorMessage },
            })
          );
          throw new Error(errorMessage);
        }

        // Filter out unavailable keys before downstream processing.
        const effectiveChartParameters =
          unavailableKeys && unavailableKeys.length > 0
            ? {
                ...chartParameters,
                mixedKeys: chartParameters.mixedKeys.filter(
                  (element) => !unavailableKeys.includes(element.key)
                ),
              }
            : chartParameters;

        r.data = data;
        r.dataToPlot = {};
        r.rawDataToPlot = {};
        ChartCalculatorService.createDateArray(rawData, effectiveChartParameters);
        ChartCalculatorService.handleMixedKeys(rawData, effectiveChartParameters);
        ChartCalculatorService.handleSlices(rawData, effectiveChartParameters);
        dispatch(setPlotReady({ direction, value: true }));
        dispatch(
          setMessenger({
            direction,
            value: { id: null, message: null, isError: false },
          })
        );
        dispatch(
          setBrushRange({
            direction,
            value: {
              startIndex: 0,
              endIndex: r.dataToPlot.length - 1,
            },
          })
        );
      } else {
        dispatch(setPlotReady({ direction, value: false }));
        if (error) {
          dispatch(
            setMessenger({
              direction,
              value: {
                ...messenger,
                message:
                  "Couldn't load data for this location. Check your connection and try again.",
              },
            })
          );
        } else if (mapPagePosition.lat) {
          dispatch(
            setMessenger({
              direction,
              value: {
                ...messenger,
                message: 'Data is not available yet. Please click on the Map',
              },
            })
          );
        }
      }
    } catch (err) {
      console.log('in catch block', err);
      dispatch(
        setMessenger({
          direction,
          value: {
            ...messenger,
            message: err.message,
          },
        })
      );
    }
  }, [
    chartParameters,
    data,
    dispatch,
    error,
    isFetching,
    mapPagePosition.lat,
    setMessenger,
    setPlotReady,
  ]);

  !chartParameters &&
    Object.keys(chartParameters).length === 0 &&
    dispatch(
      setMessenger({
        direction,
        value: {
          ...messenger,
          message: 'chart parameters are not available',
        },
      })
    );

  if (isFetching) {
    return (
      <ChartLoadingSkeleton times={4}>
        <p>Fetching Time Series Data</p>
      </ChartLoadingSkeleton>
    );
  }

  if (messenger?.message) {
    return <ErrorComponent text={messenger.message}></ErrorComponent>;
  }
  if (r.dataToPlot) {
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

export default TsRequest;
