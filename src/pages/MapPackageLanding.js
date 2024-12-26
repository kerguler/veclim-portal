import { React } from "react";
import "../styles/MapPage.css";
import MapMenu from "../components/mapMenu/MapMenu";
import MapLogo from "../components/MapLogo/MapLogo";
import { PanelProvider } from "context/panelsIcons";

import { useSelector } from "react-redux";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import useMapStarter from "customHooks/useMapStarter";
import MapPackageComponent from "components/map/mapPackage/MapPackageComponent";
import { AlboDataProvider } from "context/AlboDataContext";
function MapPackageLanding() {
	useMapStarter();
	const readyToView = useSelector(
		(state) => state.fetcher.fetcherStates.readyToView
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	return (
		readyToView && (
			<div className="wrappers-wrapper">
				<MapLogo />
				<div className="map-wrapper">
					<AlboDataProvider>
						<PanelProvider>
							<MapMenu direction="left"></MapMenu>
							{/* {vectorName === "albopictus" && (
								<MapMenu direction="right"></MapMenu>
							)} */}

							<ErrorBoundary>
								<MapPackageComponent />
							</ErrorBoundary>
						</PanelProvider>
					</ AlboDataProvider>
				</div>
			</div>
		)
	);
}

export default MapPackageLanding;
