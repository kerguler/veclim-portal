import { useDispatch, useSelector } from "react-redux";
import "./alboParams.css";
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

function AlboParams() {
	const dispatch = useDispatch();

	// Selectors for Redux state
	const alboSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.value
	);
	const slider1Enabled = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.enabled
	);
	const messenger = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.messenger
	);

	// Context integration
	const {
		setDataSim,
		isLoadingSim: contextLoading,
		setIsLoadingSim,
		setErrorSim,
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
		try {
			console.log({ alboSlider1Value });
			const result = await submitAlboData(alboSlider1Value / 100).unwrap();

			console.log({ ALBORESULT: result });

			setDataSim(result); // Store data in context
			dispatch(setDataArrivedRight(true)); // Notify Redux of data arrival
		} catch (err) {
			setErrorSim(err); // Update context error state
			dispatch(setMessengerRight("Error submitting data"));
		} finally {
			setIsLoadingSim(false); // Reset loading state
		}
	};

	// Sync API state with context
	useEffect(() => {
		if (apiLoading !== contextLoading) {
			setIsLoadingSim(apiLoading);
		}
		if (dataAlbo) {
			console.log({ ALBO: dataAlbo });
			setDataSim(dataAlbo);
		}
		if (error) {
			setErrorSim(error);
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
		// <div className="albo-params-container">
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
	);
}

export default AlboParams;
// return (
// 	<div className="albo-params-container">
// 		<label htmlFor="slider1">Adjust Slider 1:</label>
// 		<input
// 			id="slider1"
// 			type="range"
// 			value={alboSlider1Value}
// 			disabled={!slider1Enabled}
// 			onChange={handleSliderChange}
// 		/>
// 		<button onClick={handleConfirm} disabled={contextLoading}>
// 			{contextLoading ? "Submitting..." : "Confirm"}
// 		</button>
// 		{messenger.message && <div className="messenger">{messenger.message}</div>}
// 	</div>
// );
// }
// import { useDispatch, useSelector } from "react-redux";
// import "./alboParams.css";
// import { set, setAlboParamsSlider1Value } from "store";
// import { setAlboRequestPlot } from "store";
// import { setSlider1EnabledRight } from "store";
// import AlboRequest from "components/charts/Plotter/AlboRequest";
// import { useSubmitAlboDataMutation } from "store";
// import { useEffect } from "react";
// import { setInvalidateSimData } from "store";
// import { setMessengerRight } from "store";
// import { setDataArrivedRight } from "store";
// import { useAlboData } from "context/AlboDataContext";
// function AlboParams() {
// 	const dispatch = useDispatch();
// 	const alboSlider1Value = useSelector(
// 		(state) =>
// 			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.value
// 	);
// 	const slider1Enabled = useSelector(
// 		(state) =>
// 			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.enabled
// 	);
// 	const handleSliderChange = (e) => {
// 		dispatch(setAlboParamsSlider1Value(e.target.value));
// 	};

// 	const handleConfirm = () => {
// 		dispatch(setSlider1EnabledRight(false));
// 		dispatch(setAlboRequestPlot(true));
// 	};
// 	const [submitAlboData, { isLoading, data: dataAlbo, error: errorAlbo }] =
// 		useSubmitAlboDataMutation();
// 	const messenger = useSelector(
// 		(state) => state.fetcher.fetcherStates.menu.right.chart.messenger
// 	);
// 	const alboRequest = useSelector(
// 		(state) => state.fetcher.fetcherStates.menu.right.chart.requestPlot
// 	);
// 	const { setData, setIsLoading, setErrorAlbo } = useAlboData();
// 	useEffect(() => {
// 		const handleConfirm = async () => {
// 			try {
// 				const response = await submitAlboData(alboSlider1Value / 100).unwrap();
// 				console.log("data Arrived");
// 				response && dispatch(setDataArrivedRight(true));
// 				dispatch(setInvalidateSimData(false));
// 				// setData(response);
// 			} catch (err) {
// 				dispatch(setDataArrivedRight(false));
// 				dispatch(
// 					setMessengerRight({
// 						...messenger,
// 						id: 4,
// 						message: "the response from the server had an error",
// 					})
// 				);
// 			}
// 		};

// 		if (alboRequest) {
// 			handleConfirm();
// 			dispatch(
// 				setMessengerRight({ ...messenger, message: null, isError: false })
// 			);
// 		} else {
// 			dispatch(setAlboRequestPlot(false));

// 			dispatch(setDataArrivedRight(false));
// 		}
// 	}, [alboSlider1Value, alboRequest, submitAlboData, dispatch]);

// 	if (isLoading) {
// 		setIsLoading(true);
// 	}
// 	if (errorAlbo) {
// 		setErrorAlbo(errorAlbo);
// 	}
// 	if (dataAlbo) {
// 		setData(dataAlbo);
// 	}

// 	return (
// 		<div className="slider-row">
// 			<div className="albo-params">
// 				<input
// 					type="range"
// 					min="0"
// 					max="100"
// 					onChange={handleSliderChange}
// 					value={alboSlider1Value}
// 					disabled={!slider1Enabled}
// 				></input>
// 			</div>
// 			<div>{alboSlider1Value}</div> {/* Display the value */}
// 			<div onClick={handleConfirm} className="confirm-button ">
// 				{" "}
// 				Confirm
// 			</div>
// 		</div>
// 	);
// }

// export default AlboParams;
