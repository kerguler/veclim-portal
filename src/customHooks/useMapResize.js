import { useEffect } from "react";
import { useLocation } from "react-router";
function useMapResize(tileLayerRef) {
	const location = useLocation();
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

export default useMapResize;
