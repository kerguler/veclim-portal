import { useSelector, useDispatch } from "react-redux";

function useFetcherVariables() {
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	const dispatch = useDispatch();
	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.map.switchMap
	);
	const pageTransition = useSelector((state) => state.location.pageTransition);
	const currentMapCenter = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapCenter
	);
	const currentMapZoom = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapZoom
	);
	const currentMaxBounds = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMaxBounds
	);
	const currentMapBounds = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapBounds
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const mapPagePosition = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);
	const directMapLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.directMap
	);
	const directMapRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.directMap
	);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const directInitLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.directInit
	);

	return {
		directInitLeft,
		tileArray,
		directMapLeft,
		mapPagePosition,
		vectorName,
		currentMapBounds,
		currentMaxBounds,
		currentMapZoom,
		currentMapCenter,
		pageTransition,
		switchMap,
		dispatch,
		mapVector,
		directMapRight,
	};
}
export default useFetcherVariables;
