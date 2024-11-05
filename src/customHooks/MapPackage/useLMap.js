import { useEffect } from "react";
import L from "leaflet";

import { useDispatch, useSelector } from "react-redux";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import useLMapResize from "./useLMapResize";
import { setCurrentMapCenter, setCurrentMapBounds } from "store";
import { current } from "@reduxjs/toolkit";
import useFetcherVariables from "customHooks/useFetcherVariables";
function useLMap(mapParRef) {
	useLMapResize();
	const dispatch = useDispatch();

	const pageTransition = useSelector((state) => state.location.pageTransition);
	let p = mapParRef.current;

	const { vectorName, switchMap, currentMapCenter, currentMapZoom, mapVector } =
		useFetcherVariables();

	useEffect(() => {
		p.map = L.map("map1", {
			maxBoundsViscosity: 0,
			maxBounds: p.maxBounds,
			zoomControl: false,
		});

		PackageMapServices.baseLayer.addTo(p.map);
		return () => {
			p.map && p.map.remove();
		};
	}, [p]);

	useEffect(() => {
		p.map.setView(
			{ lat: currentMapCenter[0], lng: currentMapCenter[1] },
			currentMapZoom
		);
		console.log("we have come tyo readjust bounds");
		
		PackageMapServices.mapBounds(
			mapParRef,
			vectorName,
			pageTransition,
			switchMap,
			currentMapCenter,
			currentMapZoom,
			dispatch
		);
	}, [
		dispatch,
		pageTransition,
		switchMap,
		vectorName,
	]);

}

export default useLMap;
