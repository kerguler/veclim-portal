import MapComponent2 from "components/map/MapComponent/MapComponent2";
import useMap from "customHooks/useMap";
import { useRef } from "react";
import { useState } from "react";
import "./PanelMap.css";
import { useDispatch, useSelector } from "react-redux";
import { setBlinkers } from "store";
import { ReactComponent as BackIcon } from "assets/icons/django/back-icon.svg";
import { setTileArray } from "store";

function PanelMap() {
	const blinkers = useSelector((state) => state.dashboard.blinkers);
	const dispatch = useDispatch();

	const handleBacktoDates = () => {
		dispatch(
			setBlinkers({
				...blinkers,
				displayProceed: true,
				disableDate0: false,
				disableDate1: false,
				displayMap: false,
			})
		);
	};
	return (
		<div className="flex-column center-h pad1">
			<div className="flex-row center-v">
				<BackIcon
					onClick={handleBacktoDates}
					width={20}
					color="black"
					height={20}
				></BackIcon>
				<h3 className="meteo-text">Pick Coordinates</h3>
			</div>
			<div id="panel-map" className="panel-map">
				<MapComponent2 />
			</div>
		</div>
	);
}

export default PanelMap;
