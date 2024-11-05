import { useEffect } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";
import useFetcherVariables from "customHooks/useFetcherVariables";
import TileLoaderService from "customHooks/TileLoaderService";
import { useDispatch, useSelector } from "react-redux";
function useTileHandler(mapParRef) {
	let p = mapParRef.current;
	const dispatch = useDispatch();
	const { tileIcons } = useContext(PanelContext);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	useEffect(() => {
		// const tiles = PackageMapServices.chooseTileIcons(tileArray, tileIcons);

		let tileMat = PackageMapServices.addTiles(
			mapParRef,
			tileArray,
			tileIcons,
			dispatch
		);
		PackageMapServices.handleDoubleMap(mapParRef, tileMat, tileArray, dispatch);

		return () => {
			TileLoaderService.removeTileStyles(tileMat);
			tileMat.forEach((tile) => {
				p.map.removeLayer(tile);
			});
		};
	}, [tileArray]);
}

export default useTileHandler;
