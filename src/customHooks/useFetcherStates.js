import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PanelContextV2 from "context/panelsIconsV2";
import "../styles/MapPage.css";
import FetcherService from "services/FetcherService";
import { setMapVector } from "store";
import { setVectorName } from "store";
import { setDirectInitError } from "store";
import { setReadyToView } from "store";
import { setMapPagePosition } from "store";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { setDisplaySimulationPanel } from "store";
import useDirectorFun from "./useDirectorFun";
const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};
const useFetcherStates = () => {
	let direction = "left";
	const dispatch = useDispatch();
	const {
		panelData,

		tileIcons,
		menuStructure,
	} = useContext(PanelContextV2);
	const vectorNames = useSelector((state) => state.vector.vectorNames);
	const { mapVector, vectorName, mapPagePosition } =
		useDirectorFun(direction);

	const query = useQuery();
	const tile = query.get("tile");
	const panel = query.get("panel");
	const decade = query.get("decade");
	const lon = query.get("lon");
	const lat = query.get("lat");
	const session = query.get("session");

	useEffect(() => {
		const defaultAlboBehaviour = () => {
			dispatch(setMapVector("albopictus"));
			dispatch(setVectorName("albopictus"));
		};

		if (session) {
			if (vectorNames.includes(session)) {
				dispatch(setMapVector(session));
				dispatch(setVectorName(session));
			} else {
				const e = new Error("No Session Found");
				e.type = "SessionError";
				e.heading = `Session ${session} Not Found`;
				e.explanation = `Available sessions are: ${vectorNames.join(", ")}`;
				dispatch(
					setDirectInitError({
						direction,
						value: {
							isError: true,
							message: {
								heading: e.heading,
								explanation: e.explanation,
							},
							type: e.type,
						},
					}),
				);
				// TODO: INVOKE ERROR MESSAGE ABOUT INVALID SESSION
			}
		}
	}, [session, dispatch, vectorNames]);

	useEffect(() => {
		console.log({ m: mapPagePosition });

		if (mapPagePosition.lat === null || mapPagePosition.lat === undefined) {
			if (lon && lat) {
				console.log({ mapPagePosition });

				dispatch(
					setMapPagePosition({
						lat: parseFloat(lat),
						lng: parseFloat(lon),
					}),
				);
			} else {
				dispatch(
					setMapPagePosition(PackageMapServices["defaultCypCenter"]),
				);
			}
		}
		console.log("panel", panel);
		if (menuStructure.filter((item) => item.key === panel).length > 0) {
			dispatch(setDisplaySimulationPanel({ direction, value: panel }));
		}
	}, [
		lon,
		lat,
		mapVector,
		mapPagePosition,
		menuStructure,
		direction,
		dispatch,
		panel,
	]);

	// useEffect(() => {
	// 	if (mapVector === "papatasi" || vectorName === "papatasi") {
	// 		if ((!lon, !lat || isNaN(lon) || isNaN(lat))) {
	// 			dispatch(
	// 				setMapPagePosition(PackageMapServices.defaultCypCenter),
	// 			);
	// 		}
	// 	}
	// }, [mapVector, dispatch, tile, tileIcons]);

	useEffect(() => {
		try {
			FetcherService.handleTiles(dispatch, tile, tileIcons, session);
			FetcherService.handlePanels(
				dispatch,
				panel,

				panelData,
				lon,
				lat,
			);
		} catch (e) {
			dispatch(
				setDirectInitError({
					direction,
					value: {
						isError: true,
						message: {
							heading: e.heading,
							explanation: e.explanation,
						},
						type: e.type,
					},
				}),
			);
		}
		//setting ready to view... are we going to handle directMap.display===-2 situation?
		dispatch(setReadyToView(true));
	}, [tile, panel, lon, lat, dispatch, mapPagePosition, session, decade]);
};
export default useFetcherStates;

// // src/components/DataFetcher.js
// import { useContext, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import PanelContext from 'context/panelsIcons';
// import '../styles/MapPage.css';
// import FetcherService from 'services/FetcherService';

// import { setMapVector } from 'store';
// import { setVectorName } from 'store';
// import { useState } from 'react';
// import { setDisplayedPanelID } from 'store';
// import { setDirectInitError } from 'store';
// import { setDirectInit } from 'store';
// import { setReadyToView } from 'store';
// const useQuery = () => {
// 	return new URLSearchParams(useLocation().search);
// };
// const useFetcherStates = () => {
// 	const dispatch = useDispatch();
// 	const { panelDataAlbo, panelDataSand, tileIconsSand, tileIconsAlbo } =
// 		useContext(PanelContext);
// 	const vectorNames = useSelector((state) => state.vector.vectorNames);
// 	const mapVector = useSelector(
// 		(state) => state.fetcher.fetcherStates.mapVector,
// 	);
// 	const directMap = useSelector(
// 		(state) => state.fetcher.fetcherStates.directMap,
// 	);
// 	const query = useQuery();
// 	const tile = query.get('tile');
// 	const ts = query.get('ts');
// 	const decade = query.get('decade');
// 	const lon = query.get('lon');
// 	const lat = query.get('lat');
// 	const session = query.get('session');
// 	const [tiles, setTiles] = useState([]);
// 	const [panels, setPanels] = useState([]);

// 	useEffect(() => {
// 		const defaultAlboBehaviour = () => {
// 			dispatch(setMapVector('albopictus'));
// 			dispatch(setVectorName('albopictus'));
// 		};

// 		if (session === null || session === '') {
// 		} else if (vectorNames.includes(session)) {
// 			dispatch(setMapVector(session));
// 			dispatch(setVectorName(session));
// 		} else {
// 			defaultAlboBehaviour();
// 		}
// 		dispatch(
// 			setDisplayedPanelID({ direction: direction || 'left', value: 0 }),
// 		);
// 	}, [session, dispatch, vectorNames]);

// 	useEffect(() => {
// 		if (mapVector === 'albopictus') {
// 			setTiles(tileIconsAlbo.map((tile) => tile.key));
// 			setPanels(
// 				panelDataAlbo.map((panel) => ({
// 					key: panel.key,
// 					decade: panel.decade,
// 					id: panel.id,
// 				})),
// 			);
// 		} else if (mapVector === 'papatasi') {
// 			setTiles(tileIconsSand.map((tile) => tile.key));
// 			setPanels(
// 				panelDataSand.map((panel) => ({
// 					key: panel.key,
// 					decade: panel.decade,
// 					id: panel.id,
// 				})),
// 			);
// 		}
// 	}, [mapVector]);

// 	useEffect(() => {
// 		if (panels.length > 0 && tiles.length > 0) {
// 			try {
// 				FetcherService.handleTiles(dispatch, tile, tiles, session);
// 				FetcherService.handlePanels(
// 					dispatch,
// 					ts,
// 					decade,
// 					panels,
// 					lon,
// 					lat,
// 				);
// 			} catch (e) {
// 				dispatch(
// 					setDisplayedPanelID({
// 						direction: direction || 'left',
// 						value: 0,
// 					}),
// 				);
// 				dispatch(
// 					setDirectInitError({
// 						isError: true,
// 						message: {
// 							heading: e.heading,
// 							explanation: e.explanation,
// 						},
// 						type: e.type,
// 					}),
// 				);
// 			}
// 			//setting ready to view... are we going to handle directMap.display===-2 situation?
// 			dispatch(setReadyToView(true));
// 		}
// 	}, [tile, tiles, panels, ts, lon, lat, dispatch, session, decade]);

// 	useEffect(() => {
// 		if (directMap.display !== -2 && directMap.display !== null) {
// 			dispatch(
// 				setDisplayedPanelID({
// 					direction: direction || 'left',
// 					value: directMap.display,
// 				}),
// 			);
// 			dispatch(setDirectInit(true));
// 		} else {
// 			setDirectInit(false);
// 		}
// 	}, [directMap.display, dispatch]);
// };

// export default useFetcherStates;
// src/components/DataFetcher.js
