import "./alboParams.css";
import { useEffect, useState } from "react";
import SliderRow from "./SliderRow";
import SimDataMessenger from "./SimDataMessenger";
import LoginComponent from "pages/LoginRegister/LoginComponent/LoginComponent";
import { useSelector } from "react-redux";
import SimulationList from "pages/ApiWelcomePage/SimulationList/SimulationList";
import useCsrf from "pages/LoginRegister/Services/useCsrf";
function AlboParams() {
	// useCsrf(false); // Initialize CSRF token for API requests
	let direction = "left";
	const [showPanel, setShowPanel] = useState(false);
	const userID = useSelector(
		(state) => state.login.apiRegisterResponse.userId,
	);

	useEffect(() => {
		if (userID) {
			setShowPanel(true);
		} else {
			console.log("No user ID found", userID);
		}
	}, [userID]);

	return showPanel ? (
		<div className='albo-params-container'>
			<SliderRow direction={direction} />
			<SimDataMessenger direction={direction} />
			<SimulationList direction={direction} />
		</div>
	) : (
		<div className='albo-params-container'>
			<LoginComponent />
		</div>
	);
}
export default AlboParams;
