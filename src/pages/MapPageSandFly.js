import { React } from "react";
import "styles/MapPage.css";
import { useDispatch, useSelector } from "react-redux";
import MapLeftMenu from "components/MapLeftMenu/MapLeftMenu";
import MapLogo from "components/MapLogo/MapLogo";
import {
	setCurrentMapZoom,
	setMapVector,
	setSuperUser,
	setTileArray,
	setPanelOpen,
	setSwitchMap,
	setCurrentMapCenter,
	setVectorName,
	setDisplayedPanelID,
} from "store";

import { useEffect } from "react";

import { useState } from "react";
import MapAdjustmentsService from "components/charts/services/MapAdjustmentsService";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import useFetcherStates from "customHooks/useFetcherStates";
import GenericMapComponent from "components/map/MapComponent/GenericMapComponent";
function MapPageSandFly() {
	const [mapready, setMapReady] = useState(true);
	useFetcherStates();
	const dispatch = useDispatch();
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	useEffect(() => {
		dispatch(setSwitchMap(true));
		dispatch(setPanelOpen(false));
		dispatch(setDisplayedPanelID(1));
		dispatch(setMapVector("papatasi"));
		// dispatch(setBrushRange({ startIndex: null, endIndex: null }));

		if (vectorName === "albopictus") {
			dispatch(setVectorName("papatasi"));
			dispatch(setTileArray(["papatasi_aprdec"]));

			dispatch(setCurrentMapCenter(MapAdjustmentsService.defaultCypCenter));
			dispatch(setCurrentMapZoom(8));
			setMapReady(false);
		} else {
			setMapReady(true);
		}
	}, [dispatch, vectorName]);

	const handleSuperUser = () => {
		dispatch(setSuperUser((superUser) => !superUser));
	};

	return (
		mapready && (
			<div className="wrappers-wrapper">
				<MapLogo />
				<div className="map-wrapper">
					<MapLeftMenu onSuperUser={handleSuperUser}></MapLeftMenu>
					<ErrorBoundary>
						{/* <MapComponent2></MapComponent2> */}
						<GenericMapComponent></GenericMapComponent>
					</ErrorBoundary>
				</div>
			</div>
		)
	);
}

export default MapPageSandFly;
