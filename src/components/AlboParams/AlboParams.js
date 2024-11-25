import { useDispatch, useSelector } from "react-redux";
import "./alboParams.css";
import { setAlboParamsSlider1Value } from "store";
import { useState } from "react";
import { useEffect } from "react";
import { useSubmitAlboDataMutation } from "store";
import { setAlboRequestPlot } from "store";
import { setSlider1EnabledRight } from "store";
function AlboParams() {
	const dispatch = useDispatch();
	const alboSlider1Value = useSelector(
		(state) => state.fetcher.fetcherStates.map.alboParams.sliderValue
	);
	const slider1Enabled = useSelector(
		(state) => state.fetcher.fetcherStates.chart.right.sliders.slider1.enabled
	);
	const handleSliderChange = (e) => {
		dispatch(setAlboParamsSlider1Value(e.target.value));
	};

	const handleConfirm = () => {
		dispatch(setSlider1EnabledRight(false));
		dispatch(setAlboRequestPlot(true));
	};

	return (
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
