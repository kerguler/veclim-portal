// src/components/DataFetcher.js
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PanelContext from "context/panelsIcons";
import "../styles/MapPage.css";
import FetcherService from "services/FetcherService";

import { setMapVector } from "store";
import { setVectorName } from "store";
import { useState } from "react";
import { setDisplayedPanelID } from "store";
import { setDirectInitError } from "store";
import { setDirectInit } from "store";
import { setReadyToView } from "store";
const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};
const useFetcherStates = () => {
	const dispatch = useDispatch();
	const { panelDataAlbo, panelDataSand, tileIconsSand, tileIconsAlbo } =
		useContext(PanelContext);
	const vectorNames = useSelector((state) => state.vector.vectorNames);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.directMap
	);
	const query = useQuery();
	const tile = query.get("tile");
	const ts = query.get("ts");
	const decade = query.get("decade");
	const lon = query.get("lon");
	const lat = query.get("lat");
	const session = query.get("session");
	const [tiles, setTiles] = useState([]);
	const [panels, setPanels] = useState([]);


	useEffect(() => {

		const defaultAlboBehaviour = () => {
			dispatch(setMapVector("albopictus"));
			dispatch(setVectorName("albopictus"));
		};

		if (session === null || session === "") {
		} else if (vectorNames.includes(session)) {
			dispatch(setMapVector(session));
			dispatch(setVectorName(session));
		} else {
			defaultAlboBehaviour();
		}
		dispatch(setDisplayedPanelID(0));
	}, [session, dispatch, vectorNames]);

	useEffect(() => {
		if (mapVector === "albopictus") {
			setTiles(tileIconsAlbo.map((tile) => tile.key));
			setPanels(
				panelDataAlbo.map((panel) => ({
					key: panel.key,
					decade: panel.decade,
					id: panel.id,
				}))
			);
		} else if (mapVector === "papatasi") {
			setTiles(tileIconsSand.map((tile) => tile.key));
			setPanels(
				panelDataSand.map((panel) => ({
					key: panel.key,
					decade: panel.decade,
					id: panel.id,
				}))
			);
		}
	}, [mapVector]);

	useEffect(() => {
		if (panels.length > 0 && tiles.length > 0) {
			try {
				FetcherService.handleTiles(dispatch, tile, tiles, session);
				FetcherService.handlePanels(dispatch, ts, decade, panels, lon, lat);
			} catch (e) {
				dispatch(setDisplayedPanelID(0));
				dispatch(
					setDirectInitError({
						isError: true,
						message: { heading: e.heading, explanation: e.explanation },
						type: e.type,
					})
				);
			}
			//setting ready to view... are we going to handle directMap.display===-2 situation?
			dispatch(setReadyToView(true));
		}
	}, [tile, tiles, panels, ts, lon, lat, dispatch, session, decade]);

	useEffect(() => {
		if (directMap.display !== -2 && directMap.display !== null) {
			dispatch(setDisplayedPanelID(directMap.display));
			dispatch(setDirectInit(true));
		} else {
			setDirectInit(false);
		}
	}, [directMap.display, dispatch]);
};

export default useFetcherStates;
