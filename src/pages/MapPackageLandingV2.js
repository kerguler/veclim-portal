import { React } from "react";
import "../styles/MapPage.css";
import MapMenu from "../components/mapMenu/mapMenuV1/MapMenu";
import MapLogo from "../components/MapLogo/MapLogo";
import { PanelProvider } from "context/panelsIcons";

import { useSelector } from "react-redux";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import useMapStarter from "customHooks/useMapStarter";
import MapPackageComponent from "components/map/mapPackage/MapPackageComponent";
import { AlboDataProvider } from "context/AlboDataContext";
import MapMenuV2 from "components/mapMenu/mapMenuV2/MapMenuV2";
import { PanelProviderV2 } from "context/panelsIconsV2";
import MapMenuPicker from "components/mapMenu/mapMenuV2/MapMenuPicker";
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
						<PanelProviderV2>
							<MapMenuPicker />

							<ErrorBoundary>
								<MapPackageComponent />
							</ErrorBoundary>
						</PanelProviderV2>
					</AlboDataProvider>
				</div>
			</div>
		)
	);
}

export default MapPackageLanding;
