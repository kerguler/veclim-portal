import { useDispatch, useSelector } from "react-redux";
import useMapRectangularMarkers from "./useMapRectangularMarkers";
import L from "leaflet";
import {
	setClickLocation,
	setCurrentMapZoom,
	setCurrentMapCenter,
	setSwitchMap,
	setMapMenuOpen,
	setPanelInterfere,
	setDisplayedPanelID,
} from "../store";
import { setHighlightMarker } from "../store";
import markerLogo from "../assets/images/VEClim-Map-Icon-30x30px.png";

import { setMapPagePosition, setPanelOpen } from "../store";
function useMapAdjustments() {
	const icon1 = L.icon({
		iconUrl: markerLogo,
		iconSize: [30, 30],
		iconAnchor: [15, 30], // The point of the icon that corresponds to the marker's location
		popupAnchor: [0, -30],
	});
	const dispatch = useDispatch();

	const { highlightMarkerFunc, roundPosition } = useMapRectangularMarkers();
	const vectorName = useSelector((state) => {
		return state.vector.vectorName;
	});

	const switchMap = useSelector((state) => state.location.switchMap);
	function updateCoordinates(e, zoomRef, centerRef, map, highlightMarker) {
		if (!e.latlng) return;

		zoomRef.current = map.getZoom();
		centerRef.current = map.getCenter();
		const { lat, lng } = e.latlng;

		highlightMarker && map.removeLayer(highlightMarker);

		let newPosition = roundPosition(lat, lng);

		highlightMarker = highlightMarkerFunc(
			lat,
			lng,
			map,
			"marker-green",
			"blue"
		);

		let elm = document.getElementById("coordinates");
		elm.innerHTML = `lat<br/>${newPosition.lat.toFixed(
			2
		)}<br/>${newPosition.lng.toFixed(2)}<br/>lon`;
		elm.style.display = "flex";
		return { highlightMarker, zoomRef, centerRef };
	}

	function mapBounds(centerRef, zoomRef) {
		let maxBounds;
		let center;
		let zoomLevel;
		if (vectorName === "albopictus" && !switchMap) {
			maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
			center = centerRef.current ? centerRef.current : [0, 0];
			zoomLevel = zoomRef.current ? zoomRef.current : 1;
		} else if (vectorName === "albopictus" && switchMap) {
			maxBounds = L.latLngBounds(L.latLng(34, 32), L.latLng(35.85, 34.68));
			center = centerRef.current ? centerRef.current : [35.05, 33.24];
			zoomLevel = zoomRef.current ? zoomRef.current : 3;
		} else {
			maxBounds = L.latLngBounds(L.latLng(34, 32), L.latLng(35.85, 34.68));
			center = centerRef.current ? centerRef.current : [35.05, 33.24];
			zoomLevel = zoomRef.current ? zoomRef.current : 3;
		}
		dispatch(setSwitchMap(false));

		return { maxBounds, center, zoomLevel };
	}

	function setMinZoom(map) {
		if (vectorName === "albopictus") {
			map.setMinZoom(
				map.getBoundsZoom(
					[
						[-90, -180],
						[90, 180],
					],
					true
				)
			);
		} else {
			map.setMinZoom(
				map.getBoundsZoom(
					[
						[33, 31],
						[36, 36],
					],
					true
				)
			);
		}
	}
	const mapResize = (map) => {
		map.setView(map.getCenter(), map.getZoom());
		if (vectorName === "albopictus") {
			map.setMinZoom(
				map.getBoundsZoom(
					[
						[-90, -180],
						[90, 180],
					],
					true
				)
			);
		} else {
			map.setMinZoom(
				map.getBoundsZoom(
					[
						[33, 31],
						[36, 36],
					],
					true
				)
			);
		}
	};

	const mouseOut = (highlightMarker, map) => {
		// coordinatesMarker.setLatLng([0, 0]); // Reset marker
		highlightMarker && map.removeLayer(highlightMarker);
		let elm = document.getElementById("coordinates");
		elm.innerHTML = "";
		elm.style.display = "none";
	};

	const switchZoom = 4;

	const markerHandler = (
		map,
		iconMarker,
		rectMarker,
		zoomRef,
		centerRef,
		prevClickPointRef
	) => {
		zoomRef.current = map.getZoom();
		if (prevClickPointRef.current) {
			iconMarker && map.removeLayer(iconMarker);
			rectMarker && map.removeLayer(rectMarker);

			let newPosition = prevClickPointRef.current;
			if (map.getZoom() > switchZoom) {
				iconMarker && map.removeLayer(iconMarker);
				rectMarker = highlightMarkerFunc(
					newPosition.lat,
					newPosition.lng,
					map,
					"",
					"green"
				);
			} else {
				rectMarker && map.removeLayer(rectMarker);
				iconMarker = L.marker(newPosition, { icon: icon1 }).addTo(map);
			}
		} else {
			return;
		}
		return { iconMarker, rectMarker, zoomRef };
	};
	const clickMap = (e, map, prevClickPointRef, iconMarker, rectMarker) => {
		const switchZoom = 4;
		let newPosition = roundPosition(e.latlng.lat, e.latlng.lng);
		prevClickPointRef.current = newPosition;
		dispatch(setMapPagePosition(newPosition));
		dispatch(setPanelOpen(true));
		dispatch(setMapMenuOpen(true));
		dispatch(setPanelInterfere(0));
		iconMarker && map.removeLayer(iconMarker);
		rectMarker && map.removeLayer(rectMarker);
		rectMarker = highlightMarkerFunc(
			newPosition.lat,
			newPosition.lng,
			map,
			"",
			"green"
		);

		iconMarker = L.marker(newPosition, { icon: icon1 }).addTo(map);
		if (map.getZoom() > switchZoom) {
			iconMarker && map.removeLayer(iconMarker);
		} else {
			rectMarker && map.removeLayer(rectMarker);
		}

		return { iconMarker, rectMarker, prevClickPointRef };
	};

	return {
		updateCoordinates,
		mapBounds,
		setMinZoom,
		mapResize,
		mouseOut,
		markerHandler,
		clickMap,
	};
}

export default useMapAdjustments;
