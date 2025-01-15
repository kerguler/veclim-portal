import LiveSearchCaps from "components/LeftPanel/MapWithDate/MyMap/SearchLocationIcon/LiveSearchCaps/LiveSearchCaps";
import SearchLocationIcon from "components/LeftPanel/MapWithDate/MyMap/SearchLocationIcon/SearchLocationIcon";
import "./settingsPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentMapCenter } from "store";
import { setCurrentMapBounds } from "store";
import { setCurrentMapZoom } from "store";
import { setCurrentMaxBounds } from "store";
import { setDirectMapLeft } from "store";
import { setDirectInitLeft } from "store";
import useMapStarter from "customHooks/useMapStarter";
import { L } from "leaflet";

import { setSwitchMap } from "store";
function SettingsPanel() {
	const dispatch = useDispatch();

	const userPosition = useSelector(
		(state) => state.fetcher.fetcherStates.map.userPosition
	);

	const [displayNoCoords, setDisplayNoCoords] = useState(false);
	const fetcherStates = useSelector((state) => state.fetcher.fetcherStates);
console.log({userPosition})

	useEffect(() => {
		setDisplayNoCoords(userPosition.lat && userPosition.lng ? false : true);
		if (userPosition.lat) {
			dispatch(setCurrentMapCenter([userPosition.lat, userPosition.lng]));
			dispatch(setCurrentMapZoom(4));

			dispatch(setSwitchMap(true));
		}
	}, [userPosition.lat, dispatch, userPosition.lng, userPosition]);

	return (
		<div className="settings-panel">
			<SearchLocationIcon border={true} />

			{displayNoCoords ? (
				<div> you need to pick location</div>
			) : (
				<div>
					User Position: lat:{userPosition.lat && userPosition.lat.toFixed(2)} lng:
					{userPosition.lng && userPosition.lng.toFixed(2)}
				</div>
			)}
		</div>
	);
}

export default SettingsPanel;
