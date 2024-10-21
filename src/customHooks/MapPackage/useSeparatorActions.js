import { useEffect } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useDispatch, useSelector } from "react-redux";
function useSeparatorActions(mapParRef) {
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const dispatch = useDispatch();
	useEffect(() => {
		const handleMarkers = () => {
			PackageMapServices.markerHandler(mapParRef, 4, vectorName, dispatch);
		};
		const handleSepClick = (e) => {
			console.log("clicked on separator");

			handleMarkers();
			e.stopPropagation();
		};
		let circularHandle = document.querySelector(".leaflet-sbs-range ");
		circularHandle && circularHandle.addEventListener("click", handleSepClick);
		return () => {
			circularHandle &&
				circularHandle.removeEventListener("click", handleSepClick);
                circularHandle=null
		};
	}, );
}

export default useSeparatorActions;
