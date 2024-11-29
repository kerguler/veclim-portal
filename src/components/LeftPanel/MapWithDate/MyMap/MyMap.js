import React, { useEffect } from "react";
import L from "leaflet";
import "./MyMap.css";
// import "leaflet/dist/leaflet.css";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useRef } from "react";
import SearchLocationIcon from "components/LeftPanel/MapWithDate/MyMap/SearchLocationIcon/SearchLocationIcon";

function MyMap({ maxZoom }) {
	const position = useSelector((state) => {
		return state.location.globalPosition;
	});
	const params = {
		map: null,
		center: null,
		zoom: null,
		maxBounds: null,
		dispatch: null,
		highlightMarker: null,
		rectMarker: null,
		iconMarker: null,
		prevClickPointRef: null,
	};
	let mapParRef = useRef(params);
	useEffect(() => {
		let p = mapParRef.current;
		p.map = L.map(
			"map",
			{
				scrollWheelZoom: false,
				zoomControl: false,
				attributionControl: false,
				interactive: false,
				boxzoom: false,
				touchZoom: false,
				doubleClickZoom: false,
				keyboard: false,
				dragging: false,
			},
			[maxZoom]
		);

		if ((position.lat === 0) & (position.lng === 0)) {
			p.map.setView(position, 1);
			return null;
		} else {
			p.map.setView(position, maxZoom);

			PackageMapServices.highlightMarkerFunc(
				position.lat,
				position.lng,
				mapParRef,
				"red",
				"red",
				"albopictus"
			);
		}
		L.tileLayer(
			"http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.webp",
			{ attribution: "", noWrap: true }
		).addTo(p.map);

		return () => {
			p.map.remove();
		};
	}, [position, maxZoom]);

	return (
		<div className="map-container-wrapper">
			
			<div id="map"></div>
			<SearchLocationIcon />
		</div>
	);
}
export default MyMap;
