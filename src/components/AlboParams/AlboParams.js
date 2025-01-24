import { useDispatch, useSelector } from "react-redux";
import "./alboParams.css";
import { useState } from "react";
import {
	setAlboParamsSlider1Value,
	setSlider1EnabledRight,
	setAlboRequestPlot,
	setMessengerRight,
	setDataArrivedRight,
	setInvalidateSimData,
} from "store"; // Ensure these actions are defined in your store
import { useSubmitAlboDataMutation } from "store"; // Adjust the import path if needed
import { useEffect } from "react";
import { useAlboData } from "context/AlboDataContext"; // Ensure this path is correct
import useDirectorFun from "customHooks/useDirectorFun";

function AlboParams() {
	const dispatch = useDispatch();
	const {
		mapPagePosition,
		openItems,
		setOpenItems,
		panelDataDir: panelData,
	} = useDirectorFun("left");
	// Selectors for Redux state
	const position = useSelector((state) => {
		return state.fetcher.fetcherStates.map.mapPagePosition;
	});
	const alboSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.value
	);
	const slider1Enabled = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.enabled
	);

	// Context integration
	const {
		setDataSim,
		isLoadingSim: contextLoading,
		setIsLoadingSim,
		setErrorSim,
		dataSim,
	} = useAlboData();

	// RTK Query Mutation
	const [submitAlboData, { isLoading: apiLoading, data: dataAlbo, error }] =
		useSubmitAlboDataMutation();

	// Handle slider changes
	const handleSliderChange = (e) => {
		dispatch(setAlboParamsSlider1Value(e.target.value));
	};

	// Handle confirm button click
	const handleConfirm = async () => {
		dispatch(setSlider1EnabledRight(false));
		dispatch(setAlboRequestPlot(true));
		setIsLoadingSim(true); // Update context state
		setMessage("Submitting..."); // Update local state
		try {
			const result = await submitAlboData({
				lon: position.lng,
				lat: position.lat,
				pr: alboSlider1Value / 100
			}).unwrap();
			setDataSim(result); // Store data in context
			dispatch(setDataArrivedRight(true)); // Notify Redux of data arrival
		} catch (err) {
			setErrorSim(err); // Update context error state
			dispatch(setMessengerRight("Error submitting data"));
		} finally {
			setIsLoadingSim(false); // Reset loading state
		}
	};
	const [message, setMessage] = useState(null);

	

	// Sync API state with context
	useEffect(() => {
		if (apiLoading) {
			setMessage(apiLoading ? "Fetching Simulation Data..." : null);
		}

		if (apiLoading !== contextLoading) {
			setIsLoadingSim(apiLoading);
		}
		if (dataAlbo) {
			setDataSim(dataAlbo);

			setMessage("Data arrived. Check the flashing icon");
		}
		if (error) {
			setErrorSim(error);
			setMessage("Error submitting data");
		}
	}, [
		apiLoading,
		dataAlbo,
		error,
		contextLoading,
		setIsLoadingSim,
		setDataSim,
		setErrorSim,
	]);

	return (
		<div className="albo-params-container">
			<div className="slider-row">
				<div className="albo-params">
					<input
						type="range"
						min="0"
						max="100"
						onChange={handleSliderChange}
						value={alboSlider1Value}
						disabled={!slider1Enabled}
					></input>
				</div>
				<div>{alboSlider1Value}</div> {/* Display the value */}
				<div onClick={handleConfirm} className="confirm-button ">
					{" "}
					Confirm
				</div>
			</div>
			<div
				style={{
					display: "flex",
					alignContent: "space-evenly",
					width: "100%",
					fontSize: "0.5rem",
				}}
			>
				<p> lat:{mapPagePosition.lat.toFixed(2)}</p>
				<p>
					{" "}
					lng:
					{mapPagePosition.lng.toFixed(2)}
				</p>
			</div>
			<div className="messenger">
				<p>{message}</p>{" "}
			</div>
		</div>
	);
}

export default AlboParams;
