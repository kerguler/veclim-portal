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
import useSimTileFunctions from "./useSimTileFunctions";
import { setDisplaySimulationPanel } from "store";
import useDirectorFun from "customHooks/useDirectorFun";
import { setShimmered } from "store";

function SimTile({ sim, direction, shimmerList }) {
	const {
		data: dataToView,
		isFetching: isSimFetching,
		error: refetchError,
		refetch: fetchWithResults,
	} = useGetSimulationListQuery({ id: sim.id, return_results: true });

	const dispatch = useDispatch();
	const [deleteSimulation] = useDeleteSimulationMutation();

	const simulationList = useSelector((state) => state.simulation.simList);
	const [displayIcon, setDisplayIcon] = useState(null);

	const { setSimResult, setDataSim } = useAlboData();

	const { simRecord, isAlboChik, displayViewIcon } = useSimTileFunctions(sim);

	const handleDeleteSimulation = (id) => {
		simTileHelpers.handleDeleteSimulation(deleteSimulation, id);
	};

	const handleDownload = () => {
		simTileHelpers.handleDownload(fetchWithResults);
	};
	const levelData = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.panelLevel,
	);
	useEffect(() => {
		dispatch(
			setDisplaySimulationPanel({ direction: direction, value: null }),
		);
	}, []);

	const handleViewSimulationResults = async (id) => {
		dispatch(setShimmered({ direction: direction, value: shimmerList }));

		simTileHelpers.handleViewSimulationResults(
			fetchWithResults,
			setSimResult,
			setDataSim,
			dispatch,
			direction,
			levelData,
		);
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
				{displayIcon && isAlboChik && displayViewIcon && (
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
					status={simRecord?.status || sim.status}
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

// const handleEditSimulation = (id) => {
// 	dispatch(setEditedSimulation(simulationList.find((sim) => sim.id === id)));
// 	dispatch(setBlinkers({ displayEditPage: true }));
// };
