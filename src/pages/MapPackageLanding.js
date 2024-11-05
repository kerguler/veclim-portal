import { React } from "react";
import "../styles/MapPage.css";
import MapLeftMenu from "../components/MapLeftMenu/MapLeftMenu";
import MapLogo from "../components/MapLogo/MapLogo";
import  { PanelProvider } from "context/panelsIcons";

import { useSelector } from "react-redux";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import useMapStarter from "customHooks/useMapStarter";
import MapPackageComponent from "components/map/mapPackage/MapPackageComponent";
function MapPackageLanding() {
	useMapStarter();
	const readyToView = useSelector(
		(state) => state.fetcher.fetcherStates.readyToView
	);
	return (
		readyToView && (
			<PanelProvider>
				<div className="wrappers-wrapper">
					<MapLogo />
					<div className="map-wrapper">
						<MapLeftMenu></MapLeftMenu>
						<ErrorBoundary>
							<MapPackageComponent />
						</ErrorBoundary>
					</div>
				</div>
			</PanelProvider>
		)
	);
}

export default MapPackageLanding;
