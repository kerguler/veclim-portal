import { useSelector } from "react-redux";
import "./SimulationTiles.css";
import { areArraysIdentical } from "pages/ApiWelcomePage/utils/simUtils";
import SimTile from "./SimTile/SimTile";
import React from "react";
import useDirectorFun from "customHooks/useDirectorFun";
import { useDispatch } from "react-redux";
import { setShimmered } from "store";
function SimulationTiles({ simData, direction }) {
	const { simulationPanels, menuStructure } = useDirectorFun(direction);
	let parents = [];
	const dispatch = useDispatch();
	const findParents = (key) => {
		let parent = menuStructure.filter((item) => item.key === key)[0].parent;
		return parent;
	};
	let shimmerList = {};
	simulationPanels.forEach((panel) => {
		const parentChain = [];
		let current = findParents(panel.key);
		while (current !== null) {
			parentChain.push(current);
			current = findParents(current);
		}
		parents.push(...parentChain);
	});

	parents.forEach((parent) => {
		if (parent !== null) {
			shimmerList = { ...shimmerList, [parent]: false };
		}
	});

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
						shimmerList={shimmerList}
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
