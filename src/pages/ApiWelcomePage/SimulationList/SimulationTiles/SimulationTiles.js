import { useSelector } from "react-redux";
import "./SimulationTiles.css";
import SimTile from "./SimTile/SimTile";
function SimulationTiles({ SimData }) {
	let simulationList = SimData;
	// const simulationList = useSelector((state) => state.simulation.simList);
	console.log({ SimData });
	if (simulationList && simulationList.length === 0) {
		return (
			<div className="flex-row full-width">
				<div className="flex-column border-r5 float-bg2">
					<h3>No simulations found</h3>
				</div>
			</div>
		);
	} else {
		return (
			simulationList &&
			simulationList.map((sim) => {
				console.log({ sim });
				return <SimTile sim={sim}></SimTile>;
			})
		);
	}
}

export default SimulationTiles;
