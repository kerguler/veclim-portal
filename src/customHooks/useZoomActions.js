import { useEffect } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function useZoomActions(mapParRef) {
    const vectorName = useSelector(state=>state.fetcher.fetcherStates.vectorName);
	let p = mapParRef.current;
    const dispatch = useDispatch();
	useEffect((params) => {
    const handleMarkers = () => {
            PackageMapServices.markerHandler(mapParRef, 4, vectorName, dispatch);
        };
    

		
			p.map.on("zoomend", handleMarkers);
			return () => {
				p.map.off("zoomend", handleMarkers);
			};
		},
		[vectorName, p.map, mapParRef, dispatch]
	);
}

export default useZoomActions;
