import { setFetcherStates } from "store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import useFetcherVariables from "./useFetcherVariables";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { setReadyToView } from "store";
import { setCurrentMapCenter } from "store";
import { setCurrentMapBounds, setCurrentMaxBounds } from "store";
import { setCurrentMapZoom } from "store";
import { setMapPagePosition } from "store";
import { setTileArray } from "store";
import { setVectorName, setMapVector } from "store";
function useMapStarter(startConditions) {
	const dispatch = useDispatch();
	const { readyToView, vectorName, mapVector, switchMap, tileArray } =
		useFetcherVariables();

	useEffect(() => {
		if (startConditions) {
			dispatch(setFetcherStates(startConditions));
		} else {
			if (mapVector === "papatasi") {
				console.log("papatasi is being dispatched");
				if (!tileArray.includes("papatasi")) {
					dispatch(setTileArray(["papatasi_aprdec"]));
				}
				dispatch(setCurrentMapCenter(PackageMapServices.defaultCypCenter));
				dispatch(setCurrentMaxBounds(PackageMapServices.cyprusBounds));
				dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
				dispatch(setCurrentMapZoom(8));
				dispatch(setReadyToView(true));
				dispatch(setVectorName("papatasi"));
			} else {
				dispatch(setReadyToView(true));
			}
		}
	}, [
		readyToView,
		dispatch,
		vectorName,
		mapVector,
		startConditions,
		switchMap,
	]);

	function mapStarter({ vectorName, mapVector, bounds }) {
		dispatch(setVectorName(vectorName));
		dispatch(setMapVector(mapVector));
		dispatch(setCurrentMapBounds(bounds));
		dispatch(setReadyToView(true));
	}
	return { mapStarter };
}

export default useMapStarter;
