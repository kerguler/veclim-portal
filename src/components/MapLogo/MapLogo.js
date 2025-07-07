import { Link } from "react-router-dom";
import veclimLogo from "assets/images/logos/VEClim-Icon.svg";
import "./mapLogo.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMapVector } from "store";
import { useSelector } from "react-redux";
import { setDisplayedPanelID } from "store";
function MapLogo() {
	const dispatch = useDispatch();
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const handleMainPageTransition = () => {
		 
		// dispatch(setMapVector(vectorName));
	};

	return (
		<div className="map-logo-wrapper">
			<Link onClick={handleMainPageTransition} to="/">
				<div className="image-container">
					<img src={veclimLogo} alt="transparent logo"></img>
				</div>
			</Link>
		</div>
	);
}

export default MapLogo;
