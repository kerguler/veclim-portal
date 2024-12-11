import { useEffect } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import L from "leaflet";
function useZoomActions(mapParRef) {
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const currentMaxBounds = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMaxBounds
	);
	const currentMapBounds = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapBounds
	);
	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.map.switchMap
	);
	let p = mapParRef.current;
	const dispatch = useDispatch();
	useEffect(() => {
		const handleMarkers = () => {
			PackageMapServices.markerHandler(mapParRef, 4, vectorName, dispatch);
		};
		p.map.on("zoomend", handleMarkers);
		if (switchMap) {
			handleMarkers();
		}
		return () => {
			p.map.off("zoomend", handleMarkers);
		};
	}, [vectorName, p.map, mapParRef, dispatch, switchMap]);
}

export default useZoomActions;
