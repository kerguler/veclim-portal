import { useEffect, useRef, useState } from "react";
import "./styles/chartSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { setRefPoint } from "../../../store";
import BrushHandles from "./BrushHandles";
import SliderMiddle from "./SliderMiddle";

function ChartSliderInterior() {
	const dispatch = useDispatch();

	const botRef = useRef();

	useEffect(() => {
		botRef.current &&
			dispatch(setRefPoint(botRef.current.getBoundingClientRect().top));
	});

	return (
		<div ref={botRef} className="chart-wrapper">
			<SliderMiddle></SliderMiddle>

			<BrushHandles pad={0} />
			<BrushHandles pad={1} />
		</div>
	);
}

export default ChartSliderInterior;
