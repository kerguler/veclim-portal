import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setForeGroundDrag, setIsDragging, setOffsetValue } from "../../store";
import SliderMarker from "./SliderMarker";
import downArrow from "../../assets/icons/arrow-wh-16px.png";
function SliderForeGround() {
	const dispatch = useDispatch();
	const isDragging = useSelector((state) => state.slider.isDragging);
	const padPositions = useSelector((state) => state.slider.padPositions);
	const refPoint = useSelector((state) => state.slider.refPoint);

	const handleForeGroundMove = (e) => {
		let newY = e.clientY
			? e.clientY - refPoint
			: e.touches[0].clientY - refPoint;
		dispatch(setOffsetValue([newY, padPositions[0] - padPositions[1]]));
		dispatch(setForeGroundDrag(true));
		dispatch(setIsDragging([true, true]));
	};

	return (
		<div className="y-brush-background" style={{ ...padPositions[2] }}>
			<div
				onMouseDown={handleForeGroundMove}
				onTouchStart={handleForeGroundMove}
				className="arrow-space"
				style={{
					top: `${padPositions[1]}px`,
					height: `${padPositions[0] - padPositions[1]}px`,
				}}
			>
				<div className="arrow-container">
					<img className="y-up-arrow" alt="arrow" src={downArrow}></img>
					{isDragging[1] && <SliderMarker direction="top"></SliderMarker>}
				</div>
				<div className="arrow-container">
					<img className="y-down-arrow" alt="arrow" src={downArrow}></img>
					{isDragging[0] && <SliderMarker direction="bottom"></SliderMarker>}
				</div>
			</div>
		</div>
	);
}

export default SliderForeGround;
