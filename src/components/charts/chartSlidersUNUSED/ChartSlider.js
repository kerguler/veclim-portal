import { useEffect } from "react";
import ChartSliderInterior from "./ChartSliderInterior";
import { useDispatch, useSelector } from "react-redux";
import {
	setActiveRange,
	setBackgroundColor,
	setForegroundColor,
	setInitialSize,
	setLimits,
	setPadPositions,
	setRange,
} from "../../../store";
import { calculateStyle } from "./BrushHandles";
function ChartSlider({ initialSize, backgroundColor, foregroundColor }) {
	const dispatch = useDispatch();
	const limits= useSelector((state) => state.slider.limits);
	const range= useSelector((state) => state.slider.range);
	useEffect(() => {
		dispatch(setForegroundColor(foregroundColor));
		dispatch(setBackgroundColor(backgroundColor));
		dispatch(setInitialSize(initialSize));
		dispatch(setLimits([range[0], range[1]]));

	
	}, [foregroundColor, backgroundColor, initialSize, dispatch]);

	return <ChartSliderInterior></ChartSliderInterior>;
}

export default ChartSlider;
