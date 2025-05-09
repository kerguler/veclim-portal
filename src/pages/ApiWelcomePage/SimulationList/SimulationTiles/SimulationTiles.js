import { useSelector } from "react-redux";
import "./SimulationTiles.css";
import { areArraysIdentical } from "pages/ApiWelcomePage/utils/simUtils";
import SimTile from "./SimTile/SimTile";
import React from "react";
function SimulationTiles({ simData, direction }) {
	if (simData && simData.length === 0) {
		return (
			<div className='flex-row full-width'>
				<div className='flex-column border-r5 float-bg2'>
					<p>No simulations found</p>
				</div>
			</div>
		);
	} else {
		return (
			simData &&
			simData.map((sim) => {
				// console.log(sim.id);
				return (
					<SimTile
						direction={direction}
						key={sim.id}
						sim={sim}
					></SimTile>
				);
			})
		);
	}
}

export default SimulationTiles;
