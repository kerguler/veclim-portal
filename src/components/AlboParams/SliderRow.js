import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAlboData } from "context/AlboDataContext";
import {
	setAlboRequestPlot,
	setDataArrived,
	setInvalidateSimData,
} from "store";
import useDirectorFun from "customHooks/useDirectorFun";
import useWindowSize from "customHooks/useWindowSize";
import {
	setSimSlider1Enabled,
	setSimulationParameterSlider1 as setSimSlider1Value,
} from "store";
const SOCKET_URL = "ws://localhost:8000/sim"; // Adjust as needed

const SliderRow = ({ direction }) => {
	const [taskId, setTaskId] = useState(null); // Store Task ID
	const socketRef = useRef(null); // Store WebSocket connection

	const { mapPagePosition, invalidateSimData, simSlider1Value, dispatch } =
		useDirectorFun(direction);

	const { setDataSim, isLoadingSim, setIsLoadingSim, setErrorSim } =
		useAlboData();

	useEffect(() => {
		// Avoid creating multiple sockets
		if (!socketRef.current) {
			const socket = io(SOCKET_URL, {
				path: "/devapi/sim-runner/socket.io/",
				transports: ["websocket", "polling"],
				reconnectionAttempts: 5,
				reconnectionDelay: 2000,
			});
			socketRef.current = socket;

			socket.on("connect", () => {
				console.log("WebSocket Connected to /sim");
			});

			socket.on("disconnect", () => {
				console.log("WebSocket Disconnected");
			});
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, []); // Run once on mount

	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const handleTaskUpdate = (message) => {
			console.log("Received WebSocket Update:", message);

			if (message.task_id === taskId) {
				if (message.status === "SUBMITTED") {
					setIsLoadingSim(true);
				} else if (message.status === "PENDING") {
					// TODO: need to convery to SimDataMessenger that the simulation is in progress and we need to make sure that dataSim stays null
					setIsLoadingSim(true);
					// setDataSim()
				} else if (message.status === "SUCCESS") {
					setDataSim(message.result); // Store final data
					setIsLoadingSim(false);
					console.log({ m: message.result });
					dispatch(setDataArrived({ direction: direction, value: true })); // Notify Redux of data arrival
				} else {
					console.log(`Simulation in Progress: ${message.status}`);
				}
			}
		};

		socket.on("task_update", handleTaskUpdate);

		return () => {
			socket.off("task_update", handleTaskUpdate);
		};
	}, [taskId]); // Only re-run when `taskId` changes

	// Handle Slider Change
	const handleSliderChange = (e) => {
		dispatch(
			setSimSlider1Value({ direction: direction, value: e.target.value })
		);
	};

	// Handle Confirm Button Click
	const handleConfirm = () => {
		const socket = socketRef.current;
		if (!socket) return;

		dispatch(setSimSlider1Enabled({ direction: direction, value: false }));
		dispatch(setAlboRequestPlot(true));
		setIsLoadingSim(true); // Update context state

		const simulationData = {
			lon: 33.0,
			lat: 35.0,
			pr: simSlider1Value / 100,
		};

		dispatch(setInvalidateSimData(false));

		console.log(
			"Sending WebSocket Request to Start Simulation...",
			simulationData
		);
		socket.emit("start_sim", simulationData); // Send WebSocket event

		// Listen for task_id only once
		const handleTaskSubmitted = (message) => {
			if (message.status === "SUBMITTED") {
				setTaskId(message.task_id);
				console.log(`Received Task ID: ${message.task_id}`);
				socket.off("task_update", handleTaskSubmitted); // Remove listener after first use
			}
		};

		socket.on("task_update", handleTaskSubmitted);
	};

	useEffect(() => {
		if (mapPagePosition.lat === null) {
			setDataSim(null);
			dispatch(setDataArrived({ direction: direction, value: false }));
			dispatch(setInvalidateSimData(true));
		} else {
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
			<div>{simSlider1Value}</div> {/* Display the value */}
			<button
				onClick={handleConfirm}
				className="confirm-button"
				disabled={!invalidateSimData}
			>
				<p style={{ fontSize: webApp ? "10px" : "14px" }}>Confirm</p>
			</button>
		</div>
	);
};

export default SliderRow;
