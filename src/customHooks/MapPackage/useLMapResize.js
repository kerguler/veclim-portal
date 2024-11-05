import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
function useLMapResize(mapParRef) {
	const location = useLocation();
	const vectorName = useSelector(state=>state.fetcher.fetcherStates.vectorName);
	useEffect(() => {
		if (
			location.pathname === "/MapPage" ||
			location.pathname === "/MapPage/" ||
			location.pathname === "/MapPage/SandFly/" ||
			location.pathname === "/MapPage/SandFly" /* your map route */
		) {
			require("leaflet/dist/leaflet.css");
			require("components/LeftPanel/MapWithDate/MyMap/MyMap.css");
		}
	}, [location]);

	useEffect(() => {
		function handleResize() {
			console.log("caught resize on useLMapResize");
			if (mapParRef&& mapParRef.current.map) {
				if (mapParRef.current.map.getZoom()<3 ){
					PackageMapServices.setMinZoom(mapParRef,vectorName);			
				}
			}
			const mapElement = document.getElementById("map1");
			if (mapElement) {
				mapElement.style.height = `${window.innerHeight}px`;
				mapElement.style.width = `${window.innerWidth}px`;
			}

		}
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});
}

export default useLMapResize;
