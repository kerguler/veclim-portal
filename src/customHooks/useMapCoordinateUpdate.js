import { useEffect } from "react";
import MapAdjustmentsService from "../components/charts/services/MapAdjustmentsService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useFetcherVariables from "./useFetcherVariables";

function useMapCoordinateUpdate(mapParRef) {
	let p = mapParRef.current;
	const dispatch = useDispatch();
	const { vectorName, tileArray, switchMap, directInit } =
		useFetcherVariables();

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
	}, [tileArray, vectorName, switchMap, dispatch, p.bounds, directInit]);
}

export default useMapCoordinateUpdate;
