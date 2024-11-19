import { React } from "react";
import "../styles/MapPage.css";
import MapMenu from "../components/mapMenu/MapMenu";
import MapLogo from "../components/MapLogo/MapLogo";
import { PanelProvider } from "context/panelsIcons";

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
						<MapMenu direction="left"></MapMenu>
						<MapMenu direction="right"></MapMenu>
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
