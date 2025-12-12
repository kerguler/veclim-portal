import React, { useState, useEffect } from 'react';
import { useAlboData } from 'context/AlboDataContext';
import {
  setAlboRequestPlot,
  setDataArrived,
  setInvalidateSimData,
} from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
import {
  setSimSlider1Enabled,
  setSimulationParameterSlider1 as setSimSlider1Value,
} from 'store';
import { useCreateSimulationMutation } from 'store';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';

const SliderRow = ({ direction }) => {
  const [taskId, setTaskId] = useState(null); // Store Task ID
  const [shouldCheck, setShouldCheck] = useState(true);
  const {
    mapPagePosition,
    simList,
    invalidateSimData,
    simSlider1Value,
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
  // Handle Slider Change
  const handleSliderChange = (e) => {
    dispatch(
      setSimSlider1Value({ direction: direction, value: e.target.value })
    );
  };

  const simulationData = {
    model_type: 'model_albochik',
    title: '',
    description: '',
    return_method: 'file',
    model_data: {
      envir: [],
      pr: [
        /* 0:production 1:test_local_data       */ 0.0,
        /* Longitude                            */ mapPagePosition.lng,
        /* Latitude                             */ mapPagePosition.lat,
        /* Human population size                */ 4000.0,
        /* Days to run transmission             */ 60.0,
        /* Number of repetitions                */ 10000.0,
        /* Vec/human scaling (0.01x-100x)       */ simSlider1Value / 100,
        /* Personal protection (0, 1-100)       */ 0.0,
        /* Vector control delay (-1:no_control) */ -1.0,
      ],
    },

    title: 'Albochik',
  };

  const handleConfirm = async () => {
    dispatch(setSimSlider1Enabled({ direction: direction, value: false }));
    dispatch(setAlboRequestPlot(true));

    const response = await createSimulation(simulationData);

    dispatch(setInvalidateSimData(false));
    if (response?.data && 'task_id' in response.data) {
      setTaskId(response.data.task_id);
      localStorage.setItem('task_id', response.data.task_id);
      console.log(`Received Task ID: ${response.data.task_id}`);
      setIsLoadingSim(true); // Update context state
    }

    if ('error' in response) {
      // dispatch(setMessenger("response"))
      console.log('Error:', response.error);
      setErrorSim(response.error);
    }
  };

  useEffect(() => {
    if (mapPagePosition.lat === null) {
      setDataSim(null);
      dispatch(setDataArrived({ direction, value: false }));
      dispatch(setInvalidateSimData(true));
    }
  }, [mapPagePosition.lat]);


  return (
    <div className="slider-row">
      <div className="albo-params">
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleSliderChange}
          value={simSlider1Value}
          disabled={!enableSlider}
        />
      </div>

      <div className="slider-value">{simSlider1Value}</div>

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
