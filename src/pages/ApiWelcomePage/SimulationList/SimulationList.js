import { useGetSimulationListQuery } from "store";
import "./SimulationList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SimulationEditPanel from "./SimulationEditPanel/SimulationEditPanel";
import { setSimList } from "store";
import SimulationTiles from "./SimulationTiles/SimulationTiles";
import { useNavigate } from "react-router-dom";

function SimulationList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const id = localStorage.getItem("id");
	const userDetails = useSelector((state) => state.login.apiRegisterResponse);
	let userId = userDetails.userId ? userDetails.userId : id;
const blinkers=useSelector((state)=>state.dashboard.blinkers)
	if (userId === undefined || userId === null) {
		navigate("/login");
	}

	const {
		data: SimData,
		isFetching: isSimListFetching,
		error: simListError,
	} = useGetSimulationListQuery(userId ? userId.toString() : "");

	useEffect(() => {
		SimData && dispatch(setSimList(SimData.simulations));
	}, [SimData, dispatch]);

	let renderedSimulationList = null;
	if (isSimListFetching) {
	} else if (simListError) {
		console.log("error", simListError.status);
	} else if (SimData) {
		// console.log(SimData);
		// dispatch(setSimList(SimData.simulations));
		renderedSimulationList = <SimulationTiles SimData={SimData} />;
	}
   
	return (
		<div className="simlist-container  ">
			{blinkers.displayEditPage && <SimulationEditPanel  />}

			<div className="title-simulations ">
				<h3>Current Simulations</h3>{" "}
			</div>

			<div className="scrollable-list  ">{renderedSimulationList}</div>
		</div>
	);
}

export default SimulationList;
