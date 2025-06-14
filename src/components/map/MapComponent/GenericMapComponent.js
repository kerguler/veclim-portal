import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./mapComponent.css";
import MapCircularProgressBar from "../MapCircularProgessBar/MapCircularProgressBar";
import { useRef } from "react";
import ColorBarComponent from "../ColorBar/ColorBarComponent";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";
import TileLoaderService from "customHooks/TileLoaderService";
import MapAdjustmentsService from "../../charts/services/MapAdjustmentsService";
import { useState } from "react";
import useMap from "customHooks/useMap";
import L from "leaflet";
import useMapCoordinateUpdate from "customHooks/useMapCoordinateUpdate";
import ErrorScreenMap from "../errorScreen/ErrorScreenMap";
import { setCurrentMapZoom } from "store";
import { setCurrentMapCenter } from "store";
import TileNameDisplay from "../tileNameDisplay/TileNameDisplay";
import { setDirectMap } from "store";
import { setDisplayedPanelID } from "store";
import useFetcherVariables from "customHooks/useFetcherVariables";

function GenericMapComponent({ fitworld }) {
	const {
		directInit,
		tileArray,
		directMap,
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
	} = useFetcherVariables();
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
		sideBySideMap: null,
	};
const optionsPanel = useSelector(
		(state) => state.fetcher.fetcherStates.map.optionsPanel)
	
const { tileOpacity, showVectorAbundance,showMapLabels } = optionsPanel;	
		const mapParRef = useRef(mapParameters);
	let p = mapParRef.current;
	const { tileIcons } = useContext(PanelContext);
	const tiles = useRef(null);

	mapParRef.current.maxBounds = currentMaxBounds
		? L.latLngBounds(currentMaxBounds[0], currentMaxBounds[1])
		: null;
	const [errorMessage, setErrorMessage] = useState(null);
	useEffect(() => {
		if (vectorName === "papatasi") {
			p.center = MapAdjustmentsService.defaultCypCenter;
		}
	});

	useEffect(() => {
		setTimeout((params) => {
			errorMessage && setErrorMessage(false);
		}, 5000);
	}, [errorMessage]);
	useMap(mapParRef);
	useMapCoordinateUpdate(mapParRef);


	useEffect(() => {
		let p=mapParRef.current;
		if (
			mapPagePosition &&
			directMap.display !== -2 &&
			directMap.display !== null
		) {
			let e = {
				latlng: {
					lat: directMap.lat,
					lng: directMap.lon,
				},
			};
			MapAdjustmentsService.handleMapClick(
				e,
				mapParRef,
				vectorName,
				dispatch,
				directMap
			);
		} else {
		}

		const handleSepClick = (e) => {
			console.log("clicked on separator");

			handleMarkers();
			e.stopPropagation();
		};
		const handleResize = () => {
			try {
				MapAdjustmentsService.resizeMap(mapParRef, vectorName, dispatch);
			} catch (error) {
				setErrorMessage(error.message);
			}
		};
		tiles.current = MapAdjustmentsService.chooseTileIcons(tileArray, tileIcons);
		if (fitworld) {
			p.map.setView(MapAdjustmentsService.defaultWorldCenter, 1);
			p.map.fitWorld();
		}
		if (p.map !== null && p.map !== undefined) {
			MapAdjustmentsService.setMinZoom(mapParRef, vectorName);
			p.map.setView({ lat: p.center[0], lng: p.center[1] }, p.zoom);
		}
		const handleMapClick = (e) => {
			MapAdjustmentsService.handleMapClick(e, mapParRef, vectorName, dispatch);
		};

		const handleMarkers = () => {
			MapAdjustmentsService.markerHandler(mapParRef, 4, vectorName, dispatch);
		};

		const handleMouseOut = () => {
			MapAdjustmentsService.mouseOut(mapParRef);
		};
		const handleMove = () => {
			let tempC = p.map.getCenter();
			let tempZ = p.map.getZoom();
			p.zoom = tempZ;
			p.center = [tempC.lat, tempC.lng];
			dispatch(setCurrentMapZoom(tempZ));
			dispatch(setCurrentMapCenter([tempC.lat, tempC.lng]));
		};

		let tileMat = MapAdjustmentsService.addTiles(
			tiles.current,
			mapParRef,
			tileArray,
			dispatch,
			tileOpacity
		);
		if (p.sideBySideMap) {
  p.sideBySideMap.remove();
  p.sideBySideMap = null;
}
		MapAdjustmentsService.handleDoubleMap(
			mapParRef,
			tileArray,
			tileMat,
			dispatch
		);

		let circularHandle = document.querySelector(".leaflet-sbs-range ");
		circularHandle && circularHandle.addEventListener("click", handleSepClick);

		p.map.on("zoomend", handleMarkers);
		p.map.on("click", handleMapClick);
		p.map.on("mouseout", handleMouseOut);
		p.map.on("resize", handleResize);
		p.map.on("move", handleMove);
		return () => {
			  if (p.sideBySideMap) {
    p.sideBySideMap.remove();
    p.sideBySideMap = null;
  }
			TileLoaderService.removeTileStyles(tileMat);
			tileMat.forEach((tile) => {
				p.map.removeLayer(tile);
			});
			circularHandle &&
				circularHandle.removeEventListener("click", handleSepClick);

			p.map.off("resize", handleResize, true);
			p.map.off("zoomend", handleMarkers, true);
			p.map.off("click", handleMapClick, true);
			p.map.off("mouseout", MapAdjustmentsService.mouseOut, true);
			p.map.off("move", handleMove);
		};
	}, [
		pageTransition,
		tileArray,
		vectorName,
		mapVector,
		switchMap,
		dispatch,
		tileIcons,
		p,
		directMap.display,
		directInit,
		fitworld,
p.map,
		tileOpacity,showMapLabels,showVectorAbundance
	]);

	return (
		<>
			{" "}
			{errorMessage && <ErrorScreenMap error={errorMessage} />}
			<MapCircularProgressBar />
			<ColorBarComponent times={tileArray.length}></ColorBarComponent>
			<TileNameDisplay></TileNameDisplay>
			<div className="map" id="map1">
				<div id="coordinates"></div>
			</div>
		</>
	);
}

export default GenericMapComponent;

function useGenericMapComponentSelectors() {
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
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.directMap
	);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.directInit
	);

	return {
		directInit,
		tileArray,
		directMap,
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
	};
}
