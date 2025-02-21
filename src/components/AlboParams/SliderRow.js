import React, { useState } from "react";

import { useSubmitAlboDataMutation } from "store";
import { useAlboData } from "context/AlboDataContext";
import { setSlider1EnabledRight } from "store";
import { setAlboRequestPlot } from "store";
import { setDataArrivedRight } from "store";
import { setMessengerRight } from "store";
import { setAlboParamsSlider1Value } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useDirectorFun from "customHooks/useDirectorFun";
import { setInvalidateSimData } from "store";
const SliderRow = () => {
	const [warnNoCoordinates, setWarnNoCoordinates] = useState(true);
	const [submitAlboData, { isLoading: apiLoading, data: dataAlbo, error }] =
		useSubmitAlboDataMutation();
	const { mapPagePosition, invalidateSimData } = useDirectorFun("left");
	const {
		setDataSim,
		isLoadingSim: contextLoading,
		setIsLoadingSim,
		setErrorSim,
		dataSim,
		simResult,
	} = useAlboData();
	const dispatch = useDispatch();
	const handleSliderChange = (e) => {
		dispatch(setAlboParamsSlider1Value(e.target.value));
	};
	const alboSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.value
	);
	const slider1Enabled = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.enabled
	);

	const handleConfirm = async () => {
		dispatch(setSlider1EnabledRight(false));
		dispatch(setAlboRequestPlot(true));
		setIsLoadingSim(true); // Update context state
		try {
			const simulationData = {
				lon: 33.0,
				lat: 35.0,
				pr: alboSlider1Value / 100,
			};
			dispatch(setInvalidateSimData(false));

			const result = await submitAlboData(simulationData).unwrap();
			console.log({ result });

			if (Object.keys(result).includes("error")) {
				setDataSim(null);
				setInvalidateSimData(true);
				dispatch(setDataArrivedRight(false));
				throw new Error(result.error);
			}
			if (!invalidateSimData) {
				setDataSim(result);
				simResult && dispatch(setDataArrivedRight(true)); // Notify Redux of data arrival}
			} else {
				setDataSim(null);
				dispatch(setDataArrivedRight(false));
			}

			// Store data in context
		} catch (err) {
			setErrorSim(err); // Update context error state
		} finally {
			setIsLoadingSim(false); // Reset loading state
		}
	};

	useEffect(() => {
		if (mapPagePosition.lat === null) {
			setWarnNoCoordinates(true);
			setDataSim(null);
			dispatch(setDataArrivedRight(false));
			dispatch(setInvalidateSimData(true));
		} else {
			setWarnNoCoordinates(false);
		}
	}, [mapPagePosition.lat]);
	if (apiLoading !== contextLoading) {
		setIsLoadingSim(apiLoading);
	}
	if (
		dataAlbo &&
		!Object.keys(dataAlbo).includes("error") &&
		mapPagePosition.lat &&
		!invalidateSimData
	) {
		setDataSim(dataAlbo);
		simResult && dispatch(setDataArrivedRight(true));
	}

	if (error) {
		setErrorSim(error);
	}

	return (
		<div className="slider-row">
			<div className="albo-params">
				<input
					type="range"
					min="0"
					max="100"
					onChange={handleSliderChange}
					value={alboSlider1Value}
					disabled={!invalidateSimData}
				></input>
			</div>
			<div>{alboSlider1Value}</div> {/* Display the value */}
			<button
				onClick={handleConfirm}
				className="confirm-button "
				{...(!invalidateSimData ? { disabled: true } : {})}
			>
				{" "}
				Confirm
			</button>
		</div>
	);
};

export default SliderRow;
