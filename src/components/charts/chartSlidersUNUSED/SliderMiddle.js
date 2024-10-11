import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	foreGroundMove,
	setForeGroundDrag,
	setIsDragging,
	setOffsetValue,
	stopAllDrag,
} from "../../../store";
import downArrow from "../../../assets/icons/arrow-wh-16px.png";
import SliderToolTip from "./SliderToolTip";
import { useEffect } from "react";
function SliderMiddle() {
	const dispatch = useDispatch();
	const isDragging = useSelector((state) => state.slider.isDragging);
	const padPositions = useSelector((state) => state.slider.padPositions);
	const refPoint = useSelector((state) => state.slider.refPoint);
	const foregroundDrag = useSelector((state) => state.slider.foregroundDrag);

	const doDragPad = (e) => {
		let newY = e.clientY
			? e.clientY - refPoint
			: e.touches[0].clientY - refPoint;
			dispatch(setIsDragging([true, true]));
		dispatch(foreGroundMove(newY));
	};
	const stopForeGroundDrag = (e) => {
		dispatch(stopAllDrag());
	};

	const startDrag = (e) => {
		let newY = e.clientY
			? e.clientY - refPoint
			: e.touches[0].clientY - refPoint;

		dispatch(setOffsetValue([newY, padPositions[0] - padPositions[1]]));
		dispatch(setForeGroundDrag(true));
	};
	const startDragTouch = (e) => {
		e.stopPropagation();
		let newY = e.clientY
			? e.clientY - refPoint
			: e.touches[0].clientY - refPoint;
		dispatch(setOffsetValue([newY, padPositions[0] - padPositions[1]]));
		dispatch(setForeGroundDrag(true));
		doDragPad(e);
	};
	let draggerStyle = {
		position: "fixed",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		cursor: "ns-resize",
	};

	return (
		<div className="y-brush-background" style={{ ...padPositions[2] }}>
			<div
				onMouseDown={startDrag}
				onTouchMoveCapture={(e) => doDragPad(e)}
				onTouchEnd={stopForeGroundDrag}
				className="arrow-space"
				style={{
					top: `${padPositions[1]}px`,
					height: `${padPositions[0] - padPositions[1]}px`,
				}}
			>
				<div className="arrow-container">
					<img className="y-up-arrow" alt="arrow" src={downArrow}></img>
					{isDragging[1] && <SliderToolTip direction="top"></SliderToolTip>}
				</div>
				<div className="arrow-container">
					<img className="y-down-arrow" alt="arrow" src={downArrow}></img>
					{isDragging[0] && <SliderToolTip direction="bottom"></SliderToolTip>}
				</div>
			</div>
			{foregroundDrag && (
				<div
					onTouchMove={(e) => doDragPad(e)}
					onMouseMove={(e) => doDragPad(e)}
					onMouseUp={stopForeGroundDrag}
					onTouchEnd={stopForeGroundDrag}
					style={{
						...draggerStyle,
						transitionDelay: 0.8,
					}}
				></div>
			)}
		</div>
	);
}

export default SliderMiddle;
