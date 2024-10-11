import { useDispatch, useSelector } from "react-redux";
import {
	setIsDragging,
	bottomPadMove,
	topPadMove,
	stopAllDrag,
} from "../../../store";

function BrushHandles({ pad }) {
	const padPositions = useSelector((state) => state.slider.padPositions);
	const initialSize = useSelector((state) => state.slider.initialSize);
	const isDragging = useSelector((state) => state.slider.isDragging);
	const foregroundDrag = useSelector((state) => state.slider.foregroundDrag);
	const dispatch = useDispatch();
	const refPoint = useSelector((state) => state.slider.refPoint);

	const stopDrag = (e) => {
		dispatch(stopAllDrag());
	};
	const doDragPad = (e) => {
		let newY = e.clientY
			? e.clientY - refPoint
			: e.touches[0].clientY - refPoint;
		if (isDragging[1]) {
			dispatch(topPadMove(newY));
		} else if (isDragging[0]) {
			dispatch(bottomPadMove(newY));
		} else {
		}
	};

	const startTouchDrag = (e, pad) => {
		e.stopPropagation();
		if (pad === 0) {
			dispatch(setIsDragging([true, false]));
		} else {
			dispatch(setIsDragging([false, true]));
		}
		doDragPad(e);
	};

	const startDrag = (e, pad) => {
		if (pad === 0) {
			dispatch(setIsDragging([true, false]));
		} else {
			dispatch(setIsDragging([false, true]));
		}
	};

	let pos = pad === 0 ? padPositions[0] - initialSize : padPositions[1];
	let style = {
		transform: `translateY(${pos}px)`,
	};
	if (pad === 0) {
		style = {
			...style,
			top: `${initialSize - 10}px`,
		};
	}
	let draggerStyle = {
		position: "fixed",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		cursor: "ns-resize",
	};
	return (
		<>
			<div
				onTouchMoveCapture={(e) => startTouchDrag(e, pad)}
				className={`y-brush-handle ${pad === 0 ? "bottom" : "top"}`}
				style={style}
				onMouseDown={(e) => startDrag(e, pad)}
				onTouchEnd={(e) => stopDrag(e)}
				// onTouchStart={(e) => startTouchDrag(e, pad)}
			></div>
			{isDragging[0] && !foregroundDrag && (
				<div
					onMouseMove={doDragPad}
					onTouchMove={doDragPad}
					onMouseUp={(e) => stopDrag(e)}
					onTouchEnd={(e) => stopDrag(e)}
					style={draggerStyle}
				></div>
			)}

			{isDragging[1] && !foregroundDrag && (
				<div
					onMouseMove={doDragPad}
					onTouchMove={doDragPad}
					onMouseUp={stopDrag}
					onTouchEnd={() => {
						dispatch(setIsDragging([false, false]));
						stopDrag();
					}}
					style={draggerStyle}
				></div>
			)}
			
		</>
	);
}

export default BrushHandles;
