import "./SimTile.css";
import { ReactComponent as EditIcon } from "assets/icons/django/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/django/delete-icon.svg";
import { ReactComponent as OkIcon } from "assets/icons/django/done-icon.svg";
import { useDeleteSimulationMutation, useEditSimulationMutation } from "store";
import SimulationEditPanel from "../../SimulationEditPanel/SimulationEditPanel";
import { useEffect } from "react";
import { setEditedSimulation } from "store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlinkers } from "store";
function SimTile({ sim }) {
	const dispatch = useDispatch();

	const [deleteSimulation] = useDeleteSimulationMutation();
	const handleDeleteSimulation = (id) => {
		console.log("delete", id);
		try {
			const response = deleteSimulation({ id: id });
			// console.log("DELETE RESPONSE", response);
		} catch (err) {
			console.log(err);
		}
	};
	const simulationList = useSelector((state) => state.simulation.simList);

	const [displayIcon, setDisplayIcon] = useState(null);
	const handleEditSimulation = (id) => {
		dispatch(setEditedSimulation(simulationList.find((sim) => sim.id === id)));
		dispatch(setBlinkers({ displayEditPage: true }));

		// console.log("edit", id);
	};

	return (
		<div
			onClick={() => setDisplayIcon(true)}
			onMouseEnter={() => setDisplayIcon(true)}
			onMouseLeave={() => setDisplayIcon(false)}
			key={sim.id}
			className="sim-list-item    float-bg2"
		>
			<div className="tile-entry full-width">
				<h3>Title: </h3>
				<p>{sim.title}</p>
			</div>
			{displayIcon && (
				<div className="icon-area ">
					{" "}
					<div onClick={() => handleEditSimulation(sim.id)}>
						<EditIcon className="sim-icon icon-img" />
					</div>
					<div onClick={() => handleDeleteSimulation(sim.id)}>
						<DeleteIcon className="sim-icon icon-img" />
					</div>
				</div>
			)}
		</div>
	);
}

export default SimTile;
