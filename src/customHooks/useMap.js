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
const mapOptions=useSelector(
			(state) => state.fetcher.fetcherStates.map.optionsPanel
	);	
	const {showVectorAbundance,tileOpacity,showMapLabels}=mapOptions;
	console.log({tileArray})
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
		const baseLayerOSM=MapAdjustmentsService.baseLayerOSM
		const dataLayer=MapAdjustmentsService.dataLayer;
		const labelLayer= MapAdjustmentsService.labelLayer
		baseLayerOSM.addTo(p.map);
		// labelLayer.addTo(p.map);
		if (showVectorAbundance) {
			if (!p.map.hasLayer(dataLayer)){
			dataLayer.addTo(p.map);

			}
		}
		else {
			if (p.map.hasLayer(dataLayer)) {
				p.map.removeLayer(dataLayer);
			}
		}
		if (showMapLabels) {
			if (!p.map.hasLayer(labelLayer)) {
				labelLayer.addTo(p.map);
			}
		} else {
			if (p.map.hasLayer(labelLayer)) {
				p.map.removeLayer(labelLayer);
			}
		}

		

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
		mapParRef,showVectorAbundance,showMapLabels
		
	]);
}

export default useMap;
