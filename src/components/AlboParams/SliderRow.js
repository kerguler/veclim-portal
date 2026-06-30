import React, { useState, useEffect } from 'react';
import { useAlboData } from 'context/AlboDataContext';
import {
  setAlboRequestPlot,
  setDataArrived,
  setInvalidateSimData,
} from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
import { setSimSlider1Enabled } from 'store';
import { useCreateSimulationMutation } from 'store';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';
import { setSimulationFieldValue } from 'store';
import { map } from 'leaflet';
import './SliderRow.css';
const SliderRow = ({ direction }) => {
  const [taskId, setTaskId] = useState(null); // Store Task ID
  const [shouldCheck, setShouldCheck] = useState(true);
  const {
    mapPagePosition,
    simList,
    invalidateSimData,
    simulationFieldValues,
    simSlider1Enabled: slider1Enabled,
    dispatch,
  } = useDirectorFun(direction);
  const { setDataSim, setIsLoadingSim, setErrorSim } = useAlboData();
  const [enableSlider, setEnableSlider] = useState(false);
  const [createSimulation /* { isLoading, isError, data }*/] =
    useCreateSimulationMutation();
  useEffect(() => {
    if (simList.length >= 10) {
      setEnableSlider(false);
    } else {
      setEnableSlider(true);
    }
  }, [simList]);

  // useEffect(() => {
  //   if (mapPagePosition.lat !== null || mapPagePosition.lng !== null) {
  //     setEnableSlider(false);
  //   }
  // }, [mapPagePosition.lat, mapPagePosition.lng]);

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
        toInt(f.humanPopulationSize.value || 1000),
        toInt(f.daysToRunTransmission.value || 60),
        toInt(f.numberOfRepetitions.value || 100),
        Number(f.vecHumanScaling.value || 50) / 100,
        Number(f.personalProtection.value || 0),
        Number(f.vectorControlDelay.value || -1),
      ],
    },
  };

  const handleConfirm = async () => {
    // dispatch(setSimSlider1Enabled({ direction: direction, value: false }));
    dispatch(setAlboRequestPlot(true));

    const response = await createSimulation(simulationData);

    dispatch(setInvalidateSimData(false));
    if (response?.data && 'task_id' in response.data) {
      setTaskId(response.data.task_id);
      localStorage.setItem('task_id', response.data.task_id);
      setIsLoadingSim(true); // Update context state
    }

    if ('error' in response) {
      // dispatch(setMessenger("response"))
      setErrorSim(response.error);
    }
  };

  useEffect(() => {
    if (mapPagePosition.lat === null) {
      setDataSim(null);
      dispatch(setDataArrived({ direction, value: false }));
      dispatch(setInvalidateSimData(true));
      setEnableSlider(false);
    } else {
      setEnableSlider(true);
    }
  }, [mapPagePosition.lat]);

  return (
    <div className="slider-row">
      <div className="albo-params">
        {/* {Object.entries(simulationFieldValues).map(([key, field]) => {
          const inputId = `sim-${direction}-${key}`;
          const isSlider = field.type === 'slider';

          return (
            <div key={key} className="albo-param-row">
              <div className="albo-param-row__header">
                <label htmlFor={inputId}>{field.label}</label>

                {isSlider && (
                  <span className="albo-param-row__value">{field.value}</span>
                )}
              </div>

              {isSlider ? (
                <>
                <div className="albo-param-row__minmax">
                    <span>{field.min}</span>
                    <span>{field.max}</span>
                  </div>
                  <input
                    id={inputId}
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

                  
                </>
              ) : (
                <input
                  id={inputId}
                  type="text"
                  inputMode="numeric"
                  value={field.value}
                  disabled={!slider1Enabled}
                  onChange={(e) => {
                    const nextValue = e.target.value;

                    if (/^\d*$/.test(nextValue)) {
                      dispatch(
                        setSimulationFieldValue({
                          direction,
                          key,
                          value: nextValue,
                        })
                      );
                    }
                  }}
                />
              )}
            </div>
          );
        })} */}
        {Object.entries(simulationFieldValues).map(([key, field]) => {
          const inputId = `sim-${direction}-${key}`;
          const isSlider = field.type === 'slider';

          const min = Number(field.min);
          const max = Number(field.max);
          const value = Number(field.value);

          const percent = max === min ? 0 : (value - min) / (max - min);

          return (
            <div key={key} className="albo-param-row">
              <label htmlFor={inputId}>{field.label}</label>

              {isSlider ? (
                <>
                  <div
                    className="slider-with-value"
                    style={{
                      '--slider-percent': percent,
                    }}
                  >
                    <span className="slider-value-bubble">{field.value}</span>
                    <div className="albo-param-row__minmax">
                      <span>{field.min}</span>
                      <span>{field.max}</span>
                    </div>
                    <input
                      id={inputId}
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
                </>
              ) : (
                <input
                  id={inputId}
                  type="text"
                  inputMode="numeric"
                  value={field.value}
                  disabled={!slider1Enabled}
                  onChange={(e) => {
                    const nextValue = e.target.value;

                    if (/^\d*$/.test(nextValue)) {
                      dispatch(
                        setSimulationFieldValue({
                          direction,
                          key,
                          value: nextValue,
                        })
                      );
                    }
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="confirm-button"
        disabled={!enableSlider}
        aria-disabled={!enableSlider}
      >
        {!enableSlider ? (
          <ToolTipComponent
            placement="top"
            label="you cannot add another simulation you need to delete some simulations"
          >
            Confirm{' '}
          </ToolTipComponent>
        ) : (
          'Confirm'
        )}
      </button>
    </div>
  );
};

export default SliderRow;
