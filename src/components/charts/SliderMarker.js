import { useSelector } from "react-redux";
function SliderMarker({ direction }) {
	let displayedValue;
    const range=useSelector(state=>state.slider.range)
	
		displayedValue =
			direction && direction === "top" ? range[1].toFixed(2) : range[0].toFixed(2);
	

	return <div className="slider-marker-wrapper"><p>{displayedValue}</p></div>;
}

export default SliderMarker;
