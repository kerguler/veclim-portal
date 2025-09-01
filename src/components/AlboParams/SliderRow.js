import React, { useState, useEffect } from "react";
import { useAlboData } from "context/AlboDataContext";
import {
	setAlboRequestPlot,
	setDataArrived,
	setInvalidateSimData,
	useFetchSimStatusQuery,
} from "store";
import useDirectorFun from "customHooks/useDirectorFun";
import useWindowSize from "customHooks/useWindowSize";
import {
	setSimSlider1Enabled,
	setSimulationParameterSlider1 as setSimSlider1Value,
} from "store";
import { useCreateSimulationMutation } from "store";
import { setMessenger } from "store";
import { useSelector } from "react-redux";
import useCsrf from "pages/LoginRegister/Services/useCsrf";
const SliderRow = ({ direction }) => {
	const [taskId, setTaskId] = useState(null); // Store Task ID
	const [shouldCheck, setShouldCheck] = useState(true);
	const { mapPagePosition, invalidateSimData, simSlider1Value, dispatch } =
		useDirectorFun(direction);

	const { setDataSim, setIsLoadingSim, setErrorSim } = useAlboData();

	const [createSimulation /* { isLoading, isError, data }*/] =
		useCreateSimulationMutation();

	// Handle Slider Change
	const handleSliderChange = (e) => {
		dispatch(
			setSimSlider1Value({ direction: direction, value: e.target.value }),
		);
	};

	const simulationData = {
		model_data: {
			envir: [],
			pr: [1.0, 33.0, 35.0, 4000.0, 60.0, 1000.0, 1.0, 0.0, -1.0],
		},

		model_type: "model_albochik",

		title: "Albochik",
	};

	// Handle Confirm Button Click
	const handleConfirm = async () => {
		dispatch(setSimSlider1Enabled({ direction: direction, value: false }));
		dispatch(setAlboRequestPlot(true));
		console.log("Sending  Request to Start Simulation...", simulationData);
		const response = await createSimulation(simulationData);

		dispatch(setInvalidateSimData(false));
		if (response?.data && "task_id" in response.data) {
			setTaskId(response.data.task_id);
			localStorage.setItem("task_id", response.data.task_id);
			console.log(`Received Task ID: ${response.data.task_id}`);
			setIsLoadingSim(true); // Update context state
		}

		if ("error" in response) {
			console.log("Error:", response.error);
			setErrorSim(response.error);

			// setIsLoadingSim(false); // Update context state
		}
	};

	useEffect(() => {
		if (mapPagePosition.lat === null) {
			setDataSim(null);
			dispatch(setDataArrived({ direction, value: false }));
			dispatch(setInvalidateSimData(true));
		}
	}, [mapPagePosition.lat]);

	const webApp = useWindowSize();

	return (
  <div className="slider-row">
    <div className="albo-params">
      <input
        type="range"
        min="0"
        max="100"
        onChange={handleSliderChange}
        value={simSlider1Value}
        disabled={!invalidateSimData}
      />
    </div>

    <div className="slider-value">{simSlider1Value}</div>

    <button
      type="button"
      onClick={handleConfirm}
      className="confirm-button"
      disabled={!invalidateSimData}
      aria-disabled={!invalidateSimData}
    >
      Confirm
    </button>
  </div>
);

};

export default SliderRow;

// const { data: simStatus, refetch } = useFetchSimStatusQuery(
// 	localStorage.getItem("task_id"),
// 	{
// 		skip: !shouldCheck, // Avoid fetching if no taskId
// 		pollingInterval: 3000, // Fetch status every 3 seconds
// 	},
// );

// useEffect(() => {
// 	if (!taskId) {
// 		setShouldCheck(false);
// 	} else if (
// 		simStatus?.state === "SUCCESS" ||
// 		simStatus?.state === "FAILED"
// 	) {
// 		setShouldCheck(false);
// 	} else {
// 		setShouldCheck(true);
// 	}
// 	if (simStatus) {
// 		console.log("Simulation Status:", simStatus);

// 		if (
// 			simStatus.state === "SUBMITTED" ||
// 			simStatus.state === "PENDING"
// 		) {
// 			setIsLoadingSim(true);
// 		} else if (simStatus.state === "SUCCESS") {
// 			setDataSim(simStatus.result.result);
// 			setIsLoadingSim(false);
// 			console.log({ result: simStatus.result.result });
// 			dispatch(setDataArrived({ direction, value: true }));
// 		} else if (simStatus.state === "FAILED") {
// 			setIsLoadingSim(false);
// 			console.error("Simulation Failed:", simStatus);
// 		}
// 	}

// 	return () => {};
// }, [taskId, simStatus]); // Only re-run when `taskId` changes
