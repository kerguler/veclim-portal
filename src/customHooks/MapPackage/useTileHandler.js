import { useEffect } from 'react';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useContext } from 'react';
import useFetcherVariables from 'customHooks/useFetcherVariables';
import TileLoaderService from 'customHooks/TileLoaderService';
import { useDispatch, useSelector } from 'react-redux';
import PanelContextV2 from 'context/panelsIconsV2';
import useDirectorFun from 'customHooks/useDirectorFun';
function useTileHandler(mapParRef) {
  let p = mapParRef.current;
  const dispatch = useDispatch();
  const { tileIcons, tileArray, optionsPanel } = useDirectorFun('left');

  const { tileOpacity, showVectorAbundance, showMapLabels } = optionsPanel;
  useEffect(() => {
    // const tiles = PackageMapServices.chooseTileIcons(tileArray, tileIcons);
    let tileMat = PackageMapServices.addTiles(
      mapParRef,
      tileArray,
      tileIcons,
      dispatch,
      tileOpacity
    );
    PackageMapServices.handleDoubleMap(mapParRef, tileMat, tileArray, dispatch);

    return () => {
      TileLoaderService.removeTileStyles(tileMat);
      tileMat.forEach((tile) => {
        p.map.removeLayer(tile);
      });
    };
  }, [tileArray, tileOpacity, showVectorAbundance, showMapLabels]);
}

export default useTileHandler;
