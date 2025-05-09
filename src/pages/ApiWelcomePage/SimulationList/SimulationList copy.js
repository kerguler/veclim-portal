import { useGetSimulationListQuery } from "store";
import "./SimulationList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SimulationEditPanel from "./SimulationEditPanel/SimulationEditPanel";
import { setSimList } from "store";
import SimulationTiles from "./SimulationTiles/SimulationTiles";
import { use } from "react";
import { areArraysIdentical } from "../utils/simUtils";
function SimulationList() {
	const dispatch = useDispatch();
	const blinkers = useSelector((state) => state.dashboard.blinkers);
	const simList = useSelector((state) => state.simulation.simList);
	const [pollingActive, setPollingActive] = useState(false);
	let id = null;
	const {
		data: simData,
		isFetching: isSimListFetching,
		error: simListError,
		refetch,
	} = useGetSimulationListQuery();

	useEffect(() => {
		if (!pollingActive) return;
		const interval = setInterval(() => {
			refetch();
		}, 3000);
		return () => clearInterval(interval);
	}, [pollingActive, refetch]);

	useEffect(() => {
		if (!simData) return;
		if (!areArraysIdentical(simList, simData)) {
			dispatch(setSimList(simData));
			console.log("SimList updated", simData);
			const hasPendingSimulations = simData.some(
				(sim) => sim.status === "pending" || sim.status === "submitted",
			);
			setPollingActive(hasPendingSimulations);
		}
	}, [simData, simList, dispatch]);

	let renderedSimulationList = null;
	if (isSimListFetching) {
		console.log("Fetching SimList...");
	} else if (simListError) {
		console.log("error", { error: simListError.status });
	} else if (!areArraysIdentical(simList, simData.simulations)) {
		console.log({ simData, simList });
		// dispatch(setSimList(simData.simulations));

		renderedSimulationList = <SimulationTiles simData={simData} />;
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
