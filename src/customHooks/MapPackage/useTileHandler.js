import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useDirectorFun from '../useDirectorFun';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import TileLoaderService from 'customHooks/TileLoaderService';
// 👇 import registry helpers (adjust path if needed)
import { getVector, VECTORS } from 'vectors/registry';

function useTileHandler(mapParRef) {
  const p = mapParRef.current;
  const dispatch = useDispatch();

  const {
    mapVector,
    tileIcons: stateTileIcons,
    tileArray,
    optionsPanel,
  } = useDirectorFun('left');

  const { tileOpacity, showVectorAbundance, showMapLabels } = optionsPanel;

  // ---- choose a vector + tileIcons source ----
  // 1) prefer current mapVector
  // 2) otherwise fall back to the first vector in the registry
  const vectorId = mapVector || (Array.isArray(VECTORS) && VECTORS[0]?.id);
  const vector = vectorId ? getVector(vectorId) : null;

  // tileIcons defined in the module (albopictus/papatasi/etc.)
  const moduleTileIcons = Array.isArray(vector?.tileIcons)
    ? vector.tileIcons
    : [];

  // final tileIcons used by the map:
  // - if Redux already has some, use those
  // - otherwise fall back to module-defined icons
  const tileIcons =
    Array.isArray(stateTileIcons) && stateTileIcons.length > 0
      ? stateTileIcons
      : moduleTileIcons;

  useEffect(() => {
    // no map yet
    if (!p || !p.map) return;

    // nothing requested
    if (!Array.isArray(tileArray) || tileArray.length === 0) return;

    // no icon metadata -> can't add tiles yet
    if (!Array.isArray(tileIcons) || tileIcons.length === 0) return;

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
        if (p.map) {
          p.map.removeLayer(tile);
        }
      });
    };
  }, [
    mapVector,
    tileArray,
    tileOpacity,
    showVectorAbundance,
    showMapLabels,
    // rerun when the number of icons changes
    Array.isArray(tileIcons) ? tileIcons.length : 0,
    p,
    dispatch,
  ]);
}

export default useTileHandler;
