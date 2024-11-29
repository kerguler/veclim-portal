import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	
	setCurrentMapCenter,
	setCurrentMapZoom,
	setDirectInitErrorLeft,
} from "store";

import PackageMapServices from "components/map/mapPackage/PackageMapServices";
function useMapBasicEvents(mapParRef, fitworld) {
	const dispatch = useDispatch();
	const directInitErrorLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.directInitError
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);

	let p = mapParRef.current;
	useEffect(() => {
		const handleMapClick = (e) => {
			PackageMapServices.handleMapClick(e, mapParRef, vectorName, dispatch);
		};

		const handleMove = () => {
			let tempC = p.map.getCenter();
			let tempZ = p.map.getZoom();
			p.zoom = tempZ;
			p.center = [tempC.lat, tempC.lng];
			dispatch(setCurrentMapZoom(tempZ));
			dispatch(setCurrentMapCenter([tempC.lat, tempC.lng]));
		};
		const handleMouseOut = () => {
			PackageMapServices.mouseOut(mapParRef);
		};
		const handleResize = () => {
			try {
				PackageMapServices.resizeMap(mapParRef, vectorName, dispatch);
			} catch (error) {
				dispatch(
					setDirectInitErrorLeft({
						...directInitErrorLeft,
						message: error.message,
					})
				);
			}
		};

		p.map.on("click", handleMapClick);
		p.map.on("mouseout", handleMouseOut);
		p.map.on("resize", handleResize);
		p.map.on("move", handleMove);
		return () => {
			p.map.off("click", handleMapClick);
			p.map.off("mouseout", handleMouseOut);
			p.map.off("resize", handleResize);
			p.map.off("move", handleMove);
			p.map.off("mouseout", PackageMapServices.mouseOut, true);
		};
	}, [dispatch, mapParRef, p, vectorName]);

	useEffect(() => {
		if (fitworld) {
			p.map.setView(PackageMapServices.defaultWorldCenter, 1);
			p.map.fitWorld();
		}
	}, [fitworld, p.map]);
}

export default useMapBasicEvents;
