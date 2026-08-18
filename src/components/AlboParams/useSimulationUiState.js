// customHooks/simulation/useSimulationUiState.js

import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAlboData } from 'context/AlboDataContext';
import useDirectorFun from 'customHooks/useDirectorFun';
import {
  setDataArrived,
  setInvalidateSimData,
  setAlbochickStatus,
} from 'store';
import { useGetSimulationListQuery } from 'store';
import { setSimList } from 'store';
export default function useSimulationUiState(direction, simulationFieldValues) {
  const dispatch = useDispatch();

  const { mapPagePosition, invalidateSimData, albochickStatus, simList } =
    useDirectorFun(direction);
  const { isFetching, error, data } = useGetSimulationListQuery({
    return_results: false,
  });
  const simcount = data ? data.length : 0;
  useEffect(() => {
    if (data) {
      dispatch(setSimList(data));
    }
  }, [data, dispatch]);

  const { setDataSim, errorSim } = useAlboData();

  const [lastSubmittedSimulationKey, setLastSubmittedSimulationKey] =
    useState(null);

  const hasSelectedCell =
    mapPagePosition?.lat != null && mapPagePosition?.lng != null;

  const maxSimsReached = simcount >= 10;

  const normalizedStatus = String(albochickStatus || '').toLowerCase();

  const isSimProcessing =
    normalizedStatus === 'pending' || normalizedStatus === 'started';

  const sliderValuesKey = useMemo(() => {
    return Object.fromEntries(
      Object.entries(simulationFieldValues || {}).map(([key, field]) => [
        key,
        field.value,
      ])
    );
  }, [simulationFieldValues]);

  const currentSimulationKey = useMemo(() => {
    return JSON.stringify({
      lat: mapPagePosition?.lat ?? null,
      lng: mapPagePosition?.lng ?? null,
      sliders: sliderValuesKey,
    });
  }, [mapPagePosition?.lat, mapPagePosition?.lng, sliderValuesKey]);

  const alreadySubmittedCurrentSetup =
    lastSubmittedSimulationKey === currentSimulationKey;

  const disableSliders = !hasSelectedCell || maxSimsReached;

  const disableConfirm =
    !hasSelectedCell || maxSimsReached || alreadySubmittedCurrentSetup;

  const markCurrentSetupSubmitted = () => {
    setLastSubmittedSimulationKey(currentSimulationKey);
  };

  useEffect(() => {
    if (!hasSelectedCell) {
      setDataSim(null);
      dispatch(setDataArrived({ direction, value: false }));
      dispatch(setInvalidateSimData(false));
      dispatch(setAlbochickStatus(null));
    }
  }, [hasSelectedCell, direction, dispatch, setDataSim]);

  useEffect(() => {
    if (normalizedStatus === 'success') {
      dispatch(setAlbochickStatus(null));
    }
  }, [normalizedStatus, dispatch]);

  const message = useMemo(() => {
    if (maxSimsReached) {
      return 'You have reached the maximum number of simulations. Please delete some simulations to run new ones.';
    }

    if (!hasSelectedCell) {
      return 'You need to pick a coordinate from the map to simulate.';
    }

    if (alreadySubmittedCurrentSetup) {
      if (isSimProcessing) {
        return 'Your simulation was submitted. Change the coordinates or any slider to run another simulation.';
      }

      return 'This setup was already submitted. Change the coordinates or any slider to run again.';
    }

    if (errorSim && !invalidateSimData) {
      console.log('errorSim:', errorSim);
      return `We have an error for lat:${Number(mapPagePosition.lat).toFixed(
        2
      )} lng:${Number(mapPagePosition.lng).toFixed(2)}: ${
        errorSim?.data?.detail || 'Unknown error'
      }`;
    }

    if (invalidateSimData) {
      return 'Ready to run simulation with new coordinates.';
    }

    return 'Ready to simulate.';
  }, [
    maxSimsReached,
    hasSelectedCell,
    alreadySubmittedCurrentSetup,
    isSimProcessing,
    errorSim,
    invalidateSimData,
    mapPagePosition?.lat,
    mapPagePosition?.lng,
  ]);

  return {
    disableConfirm,
    disableSliders,
    message,
    hasSelectedCell,
    maxSimsReached,
    alreadySubmittedCurrentSetup,
    markCurrentSetupSubmitted,
    simcount: data?.length,
  };
}
