import React, { useState, useEffect } from 'react';
import { useAlboData } from 'context/AlboDataContext';
import {
  setAlboRequestPlot,
  setDataArrived,
  setInvalidateSimData,
  setSimulationFieldValue,
  resetSimulationFieldValues,
} from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useCreateSimulationMutation } from 'store';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';
import './SliderRow.css';
const SliderRow = ({ direction }) => {
  const [taskId, setTaskId] = useState(null);
  const [enableSlider, setEnableSlider] = useState(false);

  const {
    mapPagePosition,
    simList,
    simulationFieldValues,
    simSlider1Enabled: slider1Enabled,
    dispatch,
  } = useDirectorFun(direction);

  const { setDataSim, setIsLoadingSim, setErrorSim } = useAlboData();

  const [createSimulation] = useCreateSimulationMutation();

  useEffect(() => {
    if (simList.length >= 10) {
      setEnableSlider(false);
    } else {
      setEnableSlider(true);
    }
  }, [simList]);

  useEffect(() => {
    if (mapPagePosition.lat === null) {
      setDataSim(null);
      dispatch(setDataArrived({ direction, value: false }));
      dispatch(setInvalidateSimData(true));
      setEnableSlider(false);
    } else {
      setEnableSlider(true);
    }
  }, [mapPagePosition.lat, direction, dispatch, setDataSim]);

  const f = simulationFieldValues;

  const toInt = (value, fallback) => {
    if (value === '' || value === null || value === undefined) return fallback;

    const parsed = parseInt(value, 10);

    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const simulationData = {
    model_type: 'model_albochik',
    title: 'Albochik',
    description: '',
    return_method: 'file',
    model_data: {
      envir: [],
      pr: [
        0.0,
        mapPagePosition.lng,
        mapPagePosition.lat,
        toInt(f.humanPopulationSize.value, 1000),
        toInt(f.daysToRunTransmission.value, 60),
        toInt(f.numberOfRepetitions.value, 100),
        Number(f.vecHumanScaling.value || 50) / 100,
        Number(f.personalProtection.value || 0),
        Number(f.vectorControlDelay.value || -1),
      ],
    },
  };

  const handleConfirm = async () => {
    dispatch(setAlboRequestPlot(true));

    const response = await createSimulation(simulationData);

    dispatch(setInvalidateSimData(false));

    if (response?.data && 'task_id' in response.data) {
      setTaskId(response.data.task_id);
      localStorage.setItem('task_id', response.data.task_id);
      setIsLoadingSim(true);
    }

    if ('error' in response) {
      setErrorSim(response.error);
    }
  };

  const handleReset = () => {
    dispatch(resetSimulationFieldValues({ direction }));
  };
  const renderField = ([key, field]) => {
    const inputId = `sim-${direction}-${key}`;

    return (
      <div key={key} className="sim-param-card">
        <div className="sim-param-card__header">
          <label className="sim-param-card__label" htmlFor={inputId}>
            {field.label}
          </label>

          <span className="sim-param-card__value">{field.value}</span>
        </div>
        <span className="sim-param-card__tooltip">{field.detail}</span>
        <div className="sim-param-card__limits">
          <span>{field.min}</span>
          <span>{field.max}</span>
        </div>

        <input
          id={inputId}
          className="sim-param-card__slider"
          type="range"
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          value={field.value}
          disabled={!slider1Enabled}
          onChange={(e) =>
            dispatch(
              setSimulationFieldValue({
                direction,
                key,
                value: Number(e.target.value),
              })
            )
          }
        />
      </div>
    );
  };
  return (
    <div className="sim-adjustment">
      <div className="sim-adjustment__scroll">
        <div className="sim-params">
          {Object.entries(simulationFieldValues).map(renderField)}
        </div>
      </div>
      <div className="sim-bottom">
        <div className="sim-location-status">
          <div className="sim-coordinate-card">
            <span className="sim-coordinate-card__title">Selected cell</span>

            <span className="sim-coordinate-chip">
              <span className="sim-coordinate-chip__label">Lat</span>
              <strong>
                {mapPagePosition.lat !== null &&
                mapPagePosition.lat !== undefined
                  ? Number(mapPagePosition.lat).toFixed(2)
                  : '--'}
              </strong>
            </span>

            <span className="sim-coordinate-chip">
              <span className="sim-coordinate-chip__label">Lng</span>
              <strong>
                {mapPagePosition.lng !== null &&
                mapPagePosition.lng !== undefined
                  ? Number(mapPagePosition.lng).toFixed(2)
                  : '--'}
              </strong>
            </span>
          </div>

          <div className="sim-status message">
            {mapPagePosition.lat === null
              ? 'Select a map cell to run a simulation'
              : 'Ready to run simulation with new coordinates'}
          </div>
        </div>

        <div className="sim-actions-bottom">
          <button
            type="button"
            className="sim-reset-button"
            onClick={handleReset}
            disabled={!slider1Enabled}
          >
            Reset
          </button>

          <button
            type="button"
            className="sim-confirm-button"
            onClick={handleConfirm}
            disabled={!enableSlider}
            aria-disabled={!enableSlider}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderRow;
