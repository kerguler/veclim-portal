import MapAdjustmentsService from "components/charts/services/MapAdjustmentsService";
import { exception } from "react-ga";
import { setTileArray } from "store";
import { setReadyToView } from "store";
import { setDirectInit } from "store";
import { setVectorName } from "store";
import { setPanelOpen } from "store";
import { setMapMenuOpen, setMapVector } from "store";
import { setDirectMap } from "store";

class FetcherService {
	static handleTiles(dispatch, tile, vectorDependentTiles, sessionState) {
		if (vectorDependentTiles.length === 0) {
			return;
		}
		let localTileArray = [];
		let heading = "No tile found";
		const error = new Error(heading);
		error.type = "TileError";
		if (tile === null || tile === "") {
			let explanation =
				"available tiles are:" +
				`${vectorDependentTiles.map((tile) => {
					return tile + "\n";
				})}`;
			error.heading = heading;
			error.explanation = explanation;
			localTileArray = vectorDependentTiles[0];
			if (vectorDependentTiles.includes(localTileArray)) {
				dispatch(setTileArray([vectorDependentTiles[0]]));
				return;
			}
		} else {
			localTileArray = tile.split(":");
			if (localTileArray.length === 1) {
				if (vectorDependentTiles.includes(localTileArray[0])) {
					dispatch(setTileArray(localTileArray));
					return;
				} else {
					dispatch(setTileArray(vectorDependentTiles[0]));
					error.heading = `Tile ${localTileArray[0]} Not Found`;
					error.explanation = `available tiles are: ${vectorDependentTiles.map(
						(tile) => {
							return tile + "\n";
						}
					)}`;
					throw error;
				}
			} else {
				const m = [
					vectorDependentTiles.includes(localTileArray[0]),
					vectorDependentTiles.includes(localTileArray[1]),
				];
				if (m[0] && m[1]) {
					dispatch(setTileArray(localTileArray));
					return;
				}
				if (m[0] && !m[1]) {
					dispatch(setTileArray([localTileArray[0]]));
					const heading = `two tiles were entered but only the first tile was found  ${localTileArray[0]}`;
					const explanation = `available tiles are: ${vectorDependentTiles.map(
						(tile) => {
							return tile + "\n";
						}
					)}`;
					error.heading = heading;
					error.explanation = explanation;
					throw error;
				}

				if (!m[0] && m[1]) {
					dispatch(setTileArray([localTileArray[1]]));
					const heading = `two tiles were entered but only the second tile was found  ${localTileArray[0]}`;
					const explanation = `available tiles are: ${vectorDependentTiles.map(
						(tile) => {
							return tile + "\n";
						}
					)}`;
					error.heading = heading;
					error.explanation = explanation;
					throw error;
				}
				if (!m[0] && !m[1]) {
					const heading = `two tiles were entered but none was found `;
					const explanation = `available tiles are: ${vectorDependentTiles.map(
						(tile) => {
							return tile + "\n";
						}
					)}`;
					error.heading = heading;
					error.explanation = explanation;
					throw error;
				}
			}
		}
	}
	static handlePanels(dispatch, ts, decade, panels, lon, lat) {
		if (panels.length === 0) {
			return;
		}
		let heading = "No panel found";
		let longi, lati;
		if (lon == null || lat === null || lon === "" || lat === "") {
			longi = MapAdjustmentsService.defaultCypCenter[1];
			lati = MapAdjustmentsService.defaultCypCenter[0];
		} else if (-90 <= lon && lon <= 90 && -180 <= lat && lat <= 180) {
			longi = lon;
			lati = lat;
		} else {
			longi = MapAdjustmentsService.defaultCypCenter[1];
			lati = MapAdjustmentsService.defaultCypCenter[0];
		}
		const error = new Error(heading);
		error.type = "PanelError";

		if (ts === null || ts === "") {
			dispatch(
				setDirectMap({
					lon: null,
					lat: null,
					display: -2,
				})
			);

			dispatch(setPanelOpen(false));
			dispatch(setMapMenuOpen(true));

			// throw error;
		} else {
			const panelsFound = panels.filter((panel) => panel.key === ts);
			if (panelsFound.length === 0) {
				dispatch(
					setDirectMap({
						lon: null,
						lat: null,
						display: -2,
					})
				);
			} else {
				let panelWithDecade = panels.filter(
					(p) => p.key === ts && p.decade === decade
				);
				if (panelWithDecade.length !== 0) {
					dispatch(
						setDirectMap({
							lon: parseFloat(longi),
							lat: parseFloat(lati),
							display: panelWithDecade[0].id,
						})
					);
				} else {
					if (decade === null || decade === "") {
						dispatch(
							setDirectMap({
								lon: parseFloat(longi),
								lat: parseFloat(lati),
								display: panelsFound[0].id,
							})
						);
						return;
					}
					const heading = `No panel with name ${ts} and decade ${decade} was found`;
					const explanation = "";
					error.heading = heading;
					error.explanation = explanation;
					dispatch(
						setDirectMap({
							lon: null,
							lat: null,
							display: -2,
						})
					);
					throw error;
				}
			}
		}
	}
	static standardPanelDecisions(session, tile, ts, lat, lon) {
		// this fucntion is going to determine what to set depending on the the direct init conditions/
		// we will centralize the panel decisions,
		//1)  which panels to open and when
		// 2) how to handle  the user interaction
		// 3) possible when should the map be marked as ready top view.
		// the inputs will be :
		// 1) the user clicks
		// 2) get url terms
		// 3) fetcher states
	}
}

export default FetcherService;
