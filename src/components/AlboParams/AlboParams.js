import "./alboParams.css";

import SliderRow from "./SliderRow";
import SimDataMessenger from "./SimDataMessenger";

function AlboParams() {
	let direction = "left";
	return (
		<div className="albo-params-container">
			<SliderRow direction={direction} />
			<SimDataMessenger direction={direction} />
		</div>
	);
}
export default AlboParams;
