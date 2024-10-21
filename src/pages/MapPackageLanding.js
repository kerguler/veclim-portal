import { React } from "react";
import "../styles/MapPage.css";
import { useDispatch } from "react-redux";
import MapLeftMenu from "../components/MapLeftMenu/MapLeftMenu";
import MapLogo from "../components/MapLogo/MapLogo";
import { setDirectInitError } from "../store";
import { useEffect } from "react";

import { useState } from "react";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";

import { useSelector } from "react-redux";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import useFetcherStates from "customHooks/useFetcherStates";
import GenericMapComponent from "components/map/MapComponent/GenericMapComponent";
import useMapStarter from "customHooks/useMapStarter";
import MapPackageComponent from "components/map/mapPackage/MapPackageComponent";
function MapPackageLanding() {
	useMapStarter();

	const readyToView = useSelector(
		(state) => state.fetcher.fetcherStates.readyToView
	);

	return (
		readyToView && (
			<div className="wrappers-wrapper">
				<MapLogo />
				<div className="map-wrapper">
					<MapLeftMenu></MapLeftMenu>
					<ErrorBoundary>
						<MapPackageComponent />
					</ErrorBoundary>
				</div>
			</div>
		)
	);
}

export default MapPackageLanding;
