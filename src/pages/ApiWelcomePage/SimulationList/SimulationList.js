import { useGetSimulationListQuery } from "store";
import "./SimulationList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SimulationEditPanel from "./SimulationEditPanel/SimulationEditPanel";
import { setSimList } from "store";
import SimulationTiles from "./SimulationTiles/SimulationTiles";
import { use } from "react";
import { areArraysIdentical } from "../utils/simUtils";
import useCsrf from "pages/LoginRegister/Services/useCsrf";
function SimulationList({ direction }) {
	const dispatch = useDispatch();
	useCsrf(true); // Initialize CSRF token for API requests
	const blinkers = useSelector((state) => state.dashboard.blinkers);
	const simList = useSelector((state) => state.simulation.simList);
	let id = null;
	const {
		data: simData,
		isFetching: isSimListFetching,
		error: simListError,
	} = useGetSimulationListQuery({ return_results: false });

	useEffect(() => {
		if (!simData) return;
		dispatch(setSimList(simData));
		console.log("SimList updated", simData);
	}, [simData, simList, dispatch]);

	let renderedSimulationList = null;
	if (simData) {
		renderedSimulationList = (
			<SimulationTiles simData={simData} direction={direction} />
		);
	} else {
		renderedSimulationList = (
			<div>
				<p>somethingg terrible happened</p>
			</div>
		);
	}

	return (
		<div className='simlist-container  '>
			{blinkers.displayEditPage && <SimulationEditPanel />}

			<div className='title-simulations '>
				<p>Current Simulations</p>{" "}
			</div>

			<div className='scrollable-list  '>{renderedSimulationList}</div>
		</div>
	);
}

export default SimulationList;
