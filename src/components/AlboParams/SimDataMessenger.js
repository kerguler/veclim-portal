import { useState } from "react";

import { set, useSubmitAlboDataMutation } from "store"; // Adjust the import path if needed
import { useEffect } from "react";
import { useAlboData } from "context/AlboDataContext"; // Ensure this path is correct
import useDirectorFun from "customHooks/useDirectorFun";
import { useDispatch, useSelector } from "react-redux";
import { setDataArrivedRight } from "store";
import { setInvalidateSimData } from "store";
import { setDataArrivedLeft } from "store";
function SimDataMessenger() {
	const {
		setDataSim,
		isLoadingSim: contextLoading,
		dataSim,
		setIsLoadingSim,

		errorSim,
	} = useAlboData();
	const dispatch = useDispatch();
	const { mapPagePosition, invalidateSimData } = useDirectorFun("left");

	

	const [message, setMessage] = useState(null);
	// Sync API state with context

	useEffect(() => {
		if (invalidateSimData && !dataSim) {
			setMessage("Ready to run simulation");
			setDataSim(null);
			setIsLoadingSim(false);
		}
	}, [invalidateSimData]);

	useEffect(() => {
		if (contextLoading) {
			if (invalidateSimData) {
				setMessage("Ready to run simulation, with new coordinates");
			}
		}
	}, [contextLoading]);

	useEffect(() => {
		if (mapPagePosition.lat) {
			if (contextLoading) {
				if (invalidateSimData) {
					dispatch(setDataArrivedRight(false));
					setDataSim(null);
				} else {
					setMessage(
						`We have submitted your request for lat:${mapPagePosition.lat.toFixed(
							2
						)} lng:${mapPagePosition.lng.toFixed(
							2
						)}. we are fetching your results`
					);
				}
			}
			if (dataSim) {
				if (invalidateSimData) {
					setMessage(
						"you have picked new coordinates, you need to resubmit your coordinates to run a new simulation"
					);
					dispatch(setDataArrivedRight(false));
					dispatch(setInvalidateSimData(false));
					setDataSim(null);
				} else {
					setMessage(
						`We have received your simulation data for lat:${mapPagePosition.lat.toFixed(
							2
						)} lng:${mapPagePosition.lng.toFixed(2)}.`
					);
				}
			}
			if (errorSim) {
				setMessage(
					`We have an error for lat:${mapPagePosition.lat.toFixed(
						2
					)} lng:${mapPagePosition.lng.toFixed(2)}.`
				);
			}
		} else {
			dispatch(setDataArrivedRight(false));
			dispatch(setInvalidateSimData(false));
			setMessage("you need to pick a coordinate from the map to simulate");
		}
	}, [mapPagePosition.lat, contextLoading, dataSim]);
	return (
		<div>
			<DisplayedContent mapPagePosition={mapPagePosition} />
			<div className="messenger">
				<p>{message}</p>{" "}
			</div>
		</div>
	);
}

function DisplayedContent({ mapPagePosition }) {
	let displayedContent;

	if (mapPagePosition.lat) {
		displayedContent = (
			<div
				style={{
					display: "flex",
					alignContent: "space-evenly",
					width: "100%",
					fontSize: "0.5rem",
				}}
			>
				<p> lat:{mapPagePosition.lat.toFixed(2)}</p>
				<p>
					{" "}
					lng:
					{mapPagePosition.lng.toFixed(2)}
				</p>
			</div>
		);
	} else {
		displayedContent = (
			<div
				style={{
					display: "flex",
					alignContent: "space-evenly",
					width: "100%",
					fontSize: "0.5rem",
				}}
			>
				<p> we have no coordinates picked from MAp</p>
			</div>
		);
	}

	return displayedContent;
}
export default SimDataMessenger;
