import "./SimTile.css";
import { ReactComponent as DeleteIcon } from "assets/icons/django/delete-icon.svg";
import { ReactComponent as ViewIcon } from "assets/icons/django/eye-icon.svg";
import { useDeleteSimulationMutation, useEditSimulationMutation } from "store";
import SimDate from "./SimDate";
import { useEffect } from "react";
import { setEditedSimulation } from "store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlinkers } from "store";
import "components/Tooltip/ToolTip.css";
import { useGetSimulationListQuery } from "store";
import StatusIndicator from "./StatusIndicator";
import { setDataArrived } from "store";
import simTileHelpers from "./simTileHelpers";
import { useAlboData } from "context/AlboDataContext";
import { setInvalidateSimData } from "store";
function SimTile({ sim, direction }) {
	const dispatch = useDispatch();
	const [pollingActive, setPollingActive] = useState(false);
	let id = sim.id;
	const {
		data: simData,
		isFetching: isSimListFetching,
		error: simListError,
		refetch,
	} = useGetSimulationListQuery({ id: id, return_results: false });
	const { refetch: fetchWithResults } = useGetSimulationListQuery({
		id: sim.id,
		return_results: true,
	});
	const [isAlboChik, setIsAlboChik] = useState(false);
	useEffect(() => {
		if (sim.model_type === "model_albochik") {
			setIsAlboChik(true);
		}
	});

	useEffect(() => {
		if (!pollingActive) return;
		const interval = setInterval(() => {
			refetch();
		}, 3000);
		return () => clearInterval(interval);
	}, [pollingActive, refetch]);
	useEffect(() => {
		if (!simData) return;

		const isPendingSim =
			simData.status === "PENDING" || simData.status === "STARTED";
		setPollingActive(isPendingSim);
	}, [simData, dispatch]);
	const [deleteSimulation] = useDeleteSimulationMutation();
	const handleDeleteSimulation = (id) => {
		simTileHelpers.handleDeleteSimulation(deleteSimulation, id);
	};
	const simulationList = useSelector((state) => state.simulation.simList);

	const [displayIcon, setDisplayIcon] = useState(null);
	const handleEditSimulation = (id) => {
		dispatch(
			setEditedSimulation(simulationList.find((sim) => sim.id === id)),
		);
		dispatch(setBlinkers({ displayEditPage: true }));
	};
	const handleDownload = () => {
		simTileHelpers.handleDownload(fetchWithResults);
	};
	const { setSimResult, setDataSim, simResult } = useAlboData();
	const handleViewSimulationResults = async (id) => {
		if (simData.status === "PENDING" || simData.status === "STARTED") {
			console.log("Simulation is still running");
			return;
		}
		if (simData.status === "FAILED") {
			console.log("Simulation failed");
			return;
		}
		if (simData.status === "SUCCESS") {
			console.log("Simulation completed successfully");
			const result = await fetchWithResults().unwrap();
			console.log("RESULT", result.results);
			setSimResult(result.results);
			setDataSim(result.results);
			console.log("RESULT", result.results);
			dispatch(setInvalidateSimData(false));
			dispatch(setDataArrived({ direction: direction, value: true }));
		}
	};

	return (
		<div
			onClick={() => setDisplayIcon(true)}
			onMouseEnter={() => setDisplayIcon(true)}
			onMouseLeave={() => setDisplayIcon(false)}
			key={sim.id}
			className='sim-list-item float-bg2'
		>
			<div className='tile-entry '>
				<p>Id: </p>
				<p>{sim.id}</p>
				<SimDate sim={sim}></SimDate>
				{displayIcon && isAlboChik && (
					<div className='tooltip-element'>
						<div className='tooltip'> view results</div>
						<div
							onClick={() => handleViewSimulationResults(sim.id)}
						>
							{" "}
							<ViewIcon className='sim-icon icon-img' />
						</div>
					</div>
				)}
			</div>{" "}
			<div className='icon-area '>
				<StatusIndicator
					status={simData?.status || sim.status}
					setDownloadResult={handleDownload}
				/>

				{displayIcon && (
					<div className='tooltip-element'>
						<div className='tooltip'>delete</div>
						<div onClick={() => handleDeleteSimulation(sim.id)}>
							<DeleteIcon className='sim-icon icon-img' />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SimTile;
