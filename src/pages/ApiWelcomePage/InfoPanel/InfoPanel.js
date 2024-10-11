import { useDispatch, useSelector } from "react-redux";
import "./InfoPanel.css";
import { setBlinkers } from "store";
function InfoPanel() {
	const dispatch = useDispatch();
	const blinkers = useSelector((state) => state.dashboard.blinkers);

	const justifyBlinkers = (blinkerToSet) => {
		let localBlinkers = { ...blinkers };
		Object.keys(localBlinkers).forEach((key) => {
			localBlinkers[key] = false;
		});
		localBlinkers[blinkerToSet] = !blinkers[blinkerToSet];

		dispatch(setBlinkers(localBlinkers));
	};


	return (
		<div className="info-panel br-10">
			<div onClick={() => justifyBlinkers("displaySimList")}>
				<h3>Simulations</h3>
			</div>
			<div onClick={() => justifyBlinkers("displayVEClimModelList")}>
				<h3>VEClim Models</h3>
			</div>

			<div onClick={() => justifyBlinkers("displayAddSimulation")}>
				<h3>Add a Simulation</h3>{" "}
			</div>
			<div onClick={() => justifyBlinkers("displayAddVEClimModel")}>
				<h3>Add a VEClim Model</h3>{" "}
			</div>

		</div>
	);
}

export default InfoPanel;
