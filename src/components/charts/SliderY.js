import { useEffect, useRef, useState } from "react";
import "../../styles/charts/plotScaleY.css";
import { useDispatch, useSelector } from "react-redux";
import {
	setBackgroundColor,
	setForegroundColor,
	setRefPoint,
	setForeGroundDrag,
	setLimits,
	setRange,
	setOffsetValue,
} from "../../store";
import { setInitialSize, setPadPositions, setIsDragging } from "../../store";
import SliderForeGround from "./SliderForeGround";
import BrushHandle from "./BrushHandle";

function SliderY({ initialSize, backgroundColor, foregroundColor }) {
	const dispatch = useDispatch();

	const botRef = useRef();

	useEffect(() => {
		botRef.current &&
			dispatch(setRefPoint(botRef.current.getBoundingClientRect().top));
		dispatch(setLimits([0, initialSize]));
		dispatch(setForegroundColor(foregroundColor));
		dispatch(setBackgroundColor(backgroundColor));
		dispatch(setInitialSize(initialSize));
		dispatch(setRange([0, initialSize]));
	}, [
		initialSize,
		dispatch,
		window.innerWidth,
		backgroundColor,
		foregroundColor,
	]);

	
	useEffect(() => {
		const handleResize = () => {};
		window.addEventListener("resize", handleResize);
	});

	return (
		<div ref={botRef} className="chart-wrapper">
			<SliderForeGround></SliderForeGround>

			<BrushHandle pad={0} />
			<BrushHandle pad={1} />
		</div>
	);
}

export default SliderY;
