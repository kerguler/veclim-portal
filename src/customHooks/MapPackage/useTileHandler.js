import { useEffect } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";
import useFetcherVariables from "customHooks/useFetcherVariables";
import TileLoaderService from "customHooks/TileLoaderService";
import { useDispatch, useSelector } from "react-redux";
import PanelContextV2 from "context/panelsIconsV2";
import useDirectorFun from "customHooks/useDirectorFun";
function useTileHandler(mapParRef) {
	let p = mapParRef.current;
	const dispatch = useDispatch();
	const { tileIconsDir: tileIcons } = useDirectorFun("left");
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
