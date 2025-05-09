import { useEffect } from 'react';
import '../MapComponent/mapComponent.css';
import MapCircularProgressBar from '../MapCircularProgessBar/MapCircularProgressBar';
import { useRef } from 'react';
import ColorBarComponent from '../ColorBar/ColorBarComponent';
import PackageMapServices from './PackageMapServices';
import useLMapCoordinateUpdate from 'customHooks/MapPackage/useLMapCoordinateUpdate';
import ErrorScreenMap from '../errorScreen/ErrorScreenMap';
import TileNameDisplay from '../tileNameDisplay/TileNameDisplay';
import useFetcherVariables from 'customHooks/useFetcherVariables';
import useLMap from 'customHooks/MapPackage/useLMap';
import { useDispatch } from 'react-redux';
import useTileHandler from 'customHooks/MapPackage/useTileHandler';
import useSeparatorActions from 'customHooks/MapPackage/useSeparatorActions';
import useZoomActions from 'customHooks/useZoomActions';
import useMapBasicEvents from 'customHooks/MapPackage/useMapBasicEvents';
import useLMapResize from 'customHooks/MapPackage/useLMapResize';
import { useSelector } from 'react-redux';
import { setMapPagePosition } from 'store';
function MapPackageComponent({ fitworld }) {
	const dispatch = useDispatch();
	const {
		tileArray,
		currentMapBounds,
		currentMaxBounds,
		currentMapZoom,
		directMapLeft,
		vectorName,
		mapPagePosition,
		currentMapCenter,
		directMapRight,
		switchMap,
	} = useFetcherVariables();
	const userPosition = useSelector(
		(state) => state.fetcher.fetcherStates.map.userPosition,
	);

	const mapParameters = {
		map: null,
		center: currentMapCenter,
		zoom: currentMapZoom,
		maxBounds: currentMaxBounds,
		bounds: currentMapBounds,
		highlightMarker: null,
		rectMarker: null,
		iconMarker: null,
		prevClickPointRef: null,
		minZoom: 1,
		tiles: null,
		tileMat: [],
		sideBySide: null,
	};

	const mapParRef = useRef(mapParameters);
	let p = mapParRef.current;

	// 	if (p && !p.rectMarker && !p.iconMarker){
	// 	dispatch(setMapPagePosition({lat:null, lng:null}))

	// }

	useLMap(mapParRef);
	useLMapCoordinateUpdate(mapParRef);
	useTileHandler(mapParRef);
	useSeparatorActions(mapParRef);
	useZoomActions(mapParRef);
	useMapBasicEvents(mapParRef, fitworld);
	useLMapResize(mapParRef);

	useEffect(() => {
		if (
			(mapPagePosition &&
				directMapLeft.display !== -2 &&
				directMapLeft.display !== null) ||
			(directMapRight.display !== -2 && directMapRight.display !== null)
		) {
			let e = {
				latlng: {
					lat: directMapLeft.lat,
					lng: directMapLeft.lon,
				},
			};
			PackageMapServices.handleMapClick(
				e,
				mapParRef,
				vectorName,
				dispatch,
				directMapLeft,
				directMapRight,
				mapPagePosition,
				'left',
			);
		}

		return () => {};
	}, [
		directMapLeft,
		directMapRight,
		dispatch,
		vectorName,
		mapPagePosition,
		switchMap,
	]);
	// useEffect(() => {
	// 	let e = {
	// 		latlng: {
	// 			lat: userPosition.lat,
	// 			lng: userPosition.lng,
	// 		},
	// 	};
	// 	if (mapPagePosition.lat===null){userPosition.lat &&
	// 		userPosition.lng &&
	// 		PackageMapServices.handleMapClick(
	// 			e,
	// 			mapParRef,
	// 			vectorName,
	// 			dispatch,
	// 			directMapLeft,
	// 			directMapRight
	// 		);}
	// }, [userPosition]);

	return (
		<>
			<ErrorScreenMap />
			<MapCircularProgressBar />
			<ColorBarComponent times={tileArray.length}></ColorBarComponent>
			<TileNameDisplay></TileNameDisplay>
			<div className='map' id='map1'>
				<div id='coordinates'></div>
			</div>
		</>
	);
}

export default MapPackageComponent;
