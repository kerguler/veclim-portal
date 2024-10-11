import { setLeftMapLoaded, setMapLoaded, setRightMapLoaded } from "../store";
class TileLoaderService {
	static handleLoading = () => {};

	static removeTileStyles(tileMat) {
		tileMat.forEach((tileLayer) => {
			// return loaders(tileLayer, tileArray[index]);

			tileLayer.off("loading", this.handleLoading, true);
			tileLayer.off("tileload", this.handleTileLoad, true);
			tileLayer.off("load", this.handleLoad, true);
			tileLayer.off("tileloadstart", this.handleTileLoadStart, true);
		});
	}
	static handleTileStyles(tileMat, dispatch, tileArray) {
		tileMat.forEach((tileLayer, index) => {
			tileLayer.on("loading", this.handleLoading);
			tileLayer.on("tileload", (e) =>
				this.handleTileLoad(e, dispatch, tileArray, tileArray[index])
			);
			tileLayer.on("tileerror", (e) => {});
			tileLayer.on("load", (e) =>
				this.handleLoad(e, tileArray, dispatch, tileArray[index])
			);
			tileLayer.on("tileloadstart", (e) =>
				this.handleTileLoadStart(e, dispatch, tileArray, tileArray[index])
			);
		});
	}
	static handleTileLoad = (e, dispatch, tileArray, tileName) => {
		e.tile.style.boxShadow = "none";
		e.tile.style.transition = "boxshadow 1s ease-in-out 0s";
		e.tile.style.backdropFilter = "none";
		e.tile.style.opacity = "0.6";

		// e.tile.style.filter = "none"; // "drop-shadow(rgba(0, 0, 0, 0.3) 5px 5px 5px)";
		// e.tile.style.visibility = "inherit";
		if (tileArray.length === 1) {
			dispatch(setMapLoaded(true));
			dispatch(setLeftMapLoaded(false));
			dispatch(setRightMapLoaded(false));
		} else {
			if (tileName === tileArray[0]) {
				dispatch(setLeftMapLoaded(true));
			} else {
				dispatch(setRightMapLoaded(true));
			}
		}
	};

	static handleLoad = (e, tileArray, dispatch, tileName) => {
		if (tileArray.length === 1) {
			dispatch(setMapLoaded(true));
			dispatch(setLeftMapLoaded(false));
			dispatch(setRightMapLoaded(false));
		} else {
			if (tileName === tileArray[0]) {
				dispatch(setLeftMapLoaded(true));
			} else {
				dispatch(setRightMapLoaded(true));
			}
		}
	};

	static handleTileLoadStart = (e, dispatch, tileArray, tileName) => {

		if (tileArray.length === 1) {
			dispatch(setMapLoaded(false));
		} else {
			if (tileName === tileArray[0]) {
				dispatch(setLeftMapLoaded(false));
			} else {
				dispatch(setRightMapLoaded(false));
			}
		}
		e.tile.style.backdropFilter = "blur(20px)";
		e.tile.style.boxShadow =
			"inset -10px -10px 15px rgba(255, 255, 255, 0.5),	 inset 10px 10px 15px rgba(70, 70, 70, 0.12)";
		// e.tile.style.filter = "none"; // "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))";
		e.tile.style.visibility = "inherit";
	};
}
export default TileLoaderService;
