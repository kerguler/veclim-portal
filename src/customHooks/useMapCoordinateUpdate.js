import { useEffect } from "react";
import MapAdjustmentsService from "../components/charts/services/MapAdjustmentsService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function useMapCoordinateUpdate(mapParRef) {
	let p = mapParRef.current;
	const dispatch = useDispatch();
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.map.switchMap
	);
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.directInit
	);
	useEffect(() => {
		function handleCoordinateUpdate(e) {
			MapAdjustmentsService.updateCoordinates({
				e,
				mapParRef,
				vectorName,
				dispatch,
			});
		}

		p.map.on("mousemove", handleCoordinateUpdate);
		return () => {
			p.map.off("mousemove", handleCoordinateUpdate);
		};
	}, [tileArray, vectorName, switchMap, dispatch, p.bounds,directInit]);
}

export default useMapCoordinateUpdate;
