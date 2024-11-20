import { useDispatch, useSelector } from "react-redux";
import "./alboParams.css";
import { setAlboParamsSlider1Value } from "store";
import { useState } from "react";
function AlboParams() {
	const dispatch = useDispatch();
	const alboSlider1Value = useSelector(
		(state) => state.fetcher.fetcherStates.map.alboParams.sliderValue
	);

	const handleSliderChange = (e) => {
		dispatch(setAlboParamsSlider1Value(e.target.value));
	};

    const [alboSlider1enabled, setAlboSlider1enabled] = useState(true);
    const handleConfirm=() => {
      setAlboSlider1enabled(false);
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
                    disabled={!alboSlider1enabled}
				></input>
			</div>	
            <div>{alboSlider1Value}</div> {/* Display the value */}

            <div onClick={handleConfirm} className="confirm-button " > Confirm</div>
		</div>
      
	);
}

export default AlboParams;
