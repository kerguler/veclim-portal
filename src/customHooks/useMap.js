import { useEffect } from "react";
import L from "leaflet";

import { useDispatch, useSelector } from "react-redux";
import MapAdjustmentsService from "../components/charts/services/MapAdjustmentsService";
import useMapResize from "./useMapResize";
import { setCurrentMapCenter, setCurrentMapBounds } from "store";
import { current } from "@reduxjs/toolkit";
import useFetcherVariables from "./useFetcherVariables";
function useMap(mapParRef) {
	useMapResize();
	const dispatch = useDispatch();

	const pageTransition = useSelector((state) => state.location.pageTransition);
	let m = mapParRef.current;

	const {
		tileArray,
		vectorName,
		switchMap,
		currentMapCenter,
		currentMapZoom,
		directMap,
		directInit,
	} = useFetcherVariables();

	useEffect(() => {
		let p = mapParRef.current;
		MapAdjustmentsService.mapBounds(
			mapParRef,
			vectorName,
			pageTransition,
			switchMap,
			currentMapCenter,
			currentMapZoom,
			dispatch
		);
		p.map = L.map("map1", {
			maxBoundsViscosity: 0,
			maxBounds: p.maxBounds,
			zoomControl: false,
		});
		MapAdjustmentsService.baseLayerOSM.addTo(p.map);
		MapAdjustmentsService.dataLayer.addTo(p.map);
		// MapAdjustmentsService.labelLayer.addTo(p.map);

		p.map.setView({ lat: p.center[0], lng: p.center[1] }, p.zoom);

		let bounds = p.map ? p.map.getBounds() : null;
		const boundsArray = [
			[bounds._southWest.lat, bounds._southWest.lng], // South West corner
			[bounds._northEast.lat, bounds._northEast.lng], // North East corner
		];
		bounds && dispatch(setCurrentMapBounds(boundsArray));
		return () => {
			p.map.remove();
		};
	}, [
		tileArray,
		vectorName,
		directMap.display,
		dispatch,
		m.bounds,
		switchMap,
		directInit,
		mapParRef,
		
	]);
}

export default useMap;
