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
	const mapOptions = useSelector(
		(state) => state.fetcher.fetcherStates.map.optionsPanel,
	);
	const { showVectorAbundance, tileOpacity, showMapLabels } = mapOptions;

	const pageTransition = useSelector(
		(state) => state.location.pageTransition,
	);
	let p = mapParRef.current;

	const {
		vectorName,
		switchMap,
		currentMapCenter,
		currentMapZoom,
		mapVector,
	} = useFetcherVariables();

	useEffect(() => {
		p.map = L.map("map1", {
			maxBoundsViscosity: 0,
			maxBounds: p.maxBounds,
			zoomControl: false,
		});
		const baseLayer = PackageMapServices.baseLayer;
		const baseLayerOSM = PackageMapServices.baseLayerOSM;
		const dataLayer = PackageMapServices.dataLayer;
		const labelLayer = PackageMapServices.labelLayer;
		baseLayer.addTo(p.map);
		if (showVectorAbundance) {
			if (!p.map.hasLayer(dataLayer)) {
				dataLayer.addTo(p.map);
			}
		} else {
			if (p.map.hasLayer(dataLayer)) {
				p.map.removeLayer(dataLayer);
			}
		}
		if (showMapLabels) {
			if (!p.map.hasLayer(baseLayerOSM)) {
				baseLayerOSM.addTo(p.map);
			}
			if (p.map.hasLayer(baseLayer)) {
				p.map.removeLayer(baseLayer);
			}
		} else {
			if (!p.map.hasLayer(baseLayer)) {
				baseLayer.addTo(p.map);
			}
			if (p.map.hasLayer(baseLayerOSM)) {
				p.map.removeLayer(baseLayerOSM);
			}
		}

		p.map.setView({ lat: p.center.lat, lng: p.center.lng }, p.zoom);

		let bounds = p.map ? p.map.getBounds() : null;
		const boundsArray = [
			[bounds._southWest.lat, bounds._southWest.lng], // South West corner
			[bounds._northEast.lat, bounds._northEast.lng], // North East corner
		];
		bounds && dispatch(setCurrentMapBounds(boundsArray));
		return () => {
			p.map && p.map.remove();
		};
	}, [p, showVectorAbundance, showMapLabels]);

	useEffect(() => {
		console.log(
			"useLMap useEffect is running",
			vectorName,
			currentMapCenter,
		);
		p.map.setView(
			{ lat: currentMapCenter.lat, lng: currentMapCenter.lng },
			currentMapZoom,
		);

		PackageMapServices.mapBounds(
			mapParRef,
			vectorName,
			pageTransition,
			switchMap,
			currentMapCenter,
			currentMapZoom,
			dispatch,
		);
	}, [dispatch, pageTransition, switchMap, vectorName]);
}

export default useLMap;
