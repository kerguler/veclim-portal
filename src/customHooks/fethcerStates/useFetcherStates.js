// customHooks/fethcerStates/useFetcherStates.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FetcherService from 'services/FetcherService';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

import useDirectorFun from '../useDirectorFun';
import useSessionControl from './useSessionControl';
import useQuery from './useQuery';

import {
  setMapPagePosition,
  setReadyToView,
  setDirectInitError,
  setPanelInterfere,
  setTileArray,
} from 'store';

import { setLastPanelDisplayed } from 'components/mapMenu/menuStore/mapMenuSlice';
import { getVector } from 'vectors/registry';

const useFetcherStates = () => {
  const direction = 'left';
  const dispatch = useDispatch();

  const {
    mapVector,
    mapPagePosition,
    tileIcons,
    panelData,
    menuStructure,
  } = useDirectorFun(direction);

  const { tile, panel, decade, lon, lat, session } = useQuery();

  // 0) keep session ↔ mapVector in sync
  useSessionControl(session);

  // 1) initial short-circuit
  useEffect(() => {
    if (
      session === null &&
      tile === null &&
      panel === null &&
      decade === null &&
      lon === null &&
      lat === null
    ) {
      return;
    }
  }, [session, tile, panel, decade, lon, lat]);

  // 2) make sure we always have a mapPagePosition
  useEffect(() => {
    if (!mapPagePosition || mapPagePosition.lat == null) {
      dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
    }
  }, [mapPagePosition, dispatch]);

  // --- 🔑 decide which vector config to use ---
  // Prefer URL `session` (what the user asked for); fall back to Redux.
  const effectiveVectorId = session || mapVector;
  const activeVector = getVector(effectiveVectorId);
  const defaultTiles = activeVector?.defaults?.tileArray || [];

  // 3) default tileArray for this vector if URL doesn't specify `tile`
  useEffect(() => {
    if ((tile === null || tile === undefined || tile === '') && defaultTiles.length > 0) {
      dispatch(setTileArray(defaultTiles));
      // we will set readyToView=true once fetching succeeds
      dispatch(setReadyToView(false));
    }
  }, [tile, dispatch, defaultTiles.join(',')]);

  // 4) if URL has lon/lat and no center yet, use that
  useEffect(() => {
    if (!mapPagePosition || mapPagePosition.lat == null) {
      if (lon && lat) {
        dispatch(
          setMapPagePosition({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          })
        );
      } else {
        dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
      }
    }
  }, [lon, lat, dispatch, mapPagePosition]);

  // 5) open a panel from URL if it exists
  useEffect(() => {
    if (!panel) return;
    if (!Array.isArray(menuStructure)) return;

    const exists = menuStructure.some((item) => item.key === panel);
    if (exists) {
      dispatch(setLastPanelDisplayed({ direction, value: panel }));
      dispatch(setPanelInterfere({ direction, value: -1 }));
    }
  }, [panel, menuStructure, direction, dispatch]);

  // 6) fetch tiles + panels and control readyToView
  useEffect(() => {
    const iconsReady = Array.isArray(tileIcons) && tileIcons.length > 0;
    const panelsReady = Array.isArray(panelData) && panelData.length > 0;

    if (!iconsReady || !panelsReady) {
      dispatch(setReadyToView(false));
      return;
    }

    // Generic “has this vector actually loaded?” check
    const hasDefaultTileIcon =
      defaultTiles.length === 0 ||
      defaultTiles.some((tKey) =>
        tileIcons.some((icon) => icon.key === tKey)
      );

    if (!hasDefaultTileIcon) {
      dispatch(setReadyToView(false));
      return;
    }

    try {
      FetcherService.handleTiles(dispatch, tile, tileIcons);
      FetcherService.handlePanels(dispatch, panel, panelData, lon, lat);
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
        })
      );
      dispatch(setReadyToView(false));
      return;
    }

    dispatch(setReadyToView(true));
  }, [
    tile,
    panel,
    lon,
    lat,
    dispatch,
    decade,
    Array.isArray(tileIcons) ? tileIcons.length : 0,
    Array.isArray(panelData) ? panelData.length : 0,
    defaultTiles.join(','),
  ]);
};

export default useFetcherStates;
