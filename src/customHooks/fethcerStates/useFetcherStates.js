// customHooks/fethcerStates/useFetcherStates.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FetcherService from 'services/FetcherService';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

import useDirectorFun from '../useDirectorFun';
import useSessionControl from './useSessionControl';
import useQuery from './useQuery';
import usePermalinkHydration from 'customHooks/permalink/usePermalinkHydration';
import {
  setMapPagePosition,
  setReadyToView,
  setDirectInitError,
  setPanelInterfere,
  setTileArray,
  setCurrentMapBounds,
  setCurrentMaxBounds,
  setCurrentMapZoom,
  setCurrentMapCenter,
} from 'store';

import { setLastPanelDisplayed } from 'components/mapMenu/menuStore/mapMenuSlice';
import { getVector } from 'vectors/registry';

const useFetcherStates = () => {
  const direction = 'left';
  const dispatch = useDispatch();

  const { mapVector, mapPagePosition, tileIcons, panelData, menuStructure } =
    useDirectorFun(direction);

usePermalinkHydration({ mapPagePosition });

  // NOTE: now includes camera center (cLat/cLon)
  const {
    tile,
    panel,
    decade,
    lon, // clicked point
    lat, // clicked point
    cLon, // camera center
    cLat, // camera center
    session,
    zoom,
    bounds,
  } = useQuery();

  // 0) keep session ↔ mapVector in sync (vector in URL)
  useSessionControl(session);

  // 1) initial short-circuit — unchanged
  useEffect(() => {
    if (
      session === null &&
      tile === null &&
      panel === null &&
      decade === null &&
      lon === null &&
      lat === null &&
      cLon === null &&
      cLat === null
    ) {
      return;
    }
  }, [session, tile, panel, decade, lon, lat, cLon, cLat]);

  // --- 🔑 decide which vector config to use ---
  const effectiveVectorId = session || mapVector;
  const activeVector = getVector(effectiveVectorId);
  const defaultTiles = activeVector?.defaults?.tileArray || [];

  // 2) URL → mapPagePosition (clicked point, used for panels)
  useEffect(() => {
    if (lat && lon) {
      // clicked cell from permalink
      dispatch(
        setMapPagePosition({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
        })
      );
    } else {
      // no lat/lon in URL → leave as-is (user can click later)
      // If you want to *clear* previous click on plain /MapPage, uncomment:
      // dispatch(setMapPagePosition({ lat: null, lng: null }));
    }
  }, [lat, lon, dispatch]);

  // 3) URL → camera center (what the map is looking at)
  useEffect(() => {
    let center = null;

    if (cLat && cLon) {
      // explicit camera center from permalink
      center = {
        lat: parseFloat(cLat),
        lng: parseFloat(cLon),
      };
    } else if (lat && lon) {
      // fallback: if no cLat/cLon but we *do* have a clicked point, use that
      center = {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
    } else if (!mapPagePosition || mapPagePosition.lat == null) {
      // last fallback → default
      center = PackageMapServices.defaultCypCenter;
    }

    if (center) {
      dispatch(setCurrentMapCenter(center));
    }
  }, [cLat, cLon, lat, lon, mapPagePosition, dispatch]);

  // 4) default tileArray for this vector if URL doesn't specify `tile`
  useEffect(() => {
    if (
      (tile === null || tile === undefined || tile === '') &&
      defaultTiles.length > 0
    ) {
      dispatch(setTileArray(defaultTiles));
      dispatch(setReadyToView(false));
    }
  }, [tile, dispatch, defaultTiles.join(',')]);

  // 5) zoom from URL
  useEffect(() => {
    if (!zoom) return;
    const zNum = parseInt(zoom, 10);
    if (!Number.isNaN(zNum)) {
      dispatch(setCurrentMapZoom(zNum));
    }
  }, [zoom, dispatch]);

  // 6) bounds from URL
  useEffect(() => {
    if (!bounds) return;
    const parts = bounds.split(',').map((v) => parseFloat(v));
    if (parts.length !== 4 || parts.some((v) => Number.isNaN(v))) return;

    const [minLat, minLng, maxLat, maxLng] = parts;
    const boundsBox = {
      _southWest: { lat: minLat, lng: minLng },
      _northEast: { lat: maxLat, lng: maxLng },
    };

    dispatch(setCurrentMapBounds(boundsBox));
    dispatch(setCurrentMaxBounds(boundsBox));
  }, [bounds, dispatch]);

  // 7) open a panel from URL if it exists
  useEffect(() => {
    if (!panel) return;
    if (!Array.isArray(menuStructure)) return;

    const exists = menuStructure.some((item) => item.key === panel);
    if (exists) {
      dispatch(setLastPanelDisplayed({ direction, value: panel }));
      dispatch(setPanelInterfere({ direction, value: -1 }));
    }
  }, [panel, menuStructure, direction, dispatch]);

  // 8) fetch tiles + panels and control readyToView – unchanged
  useEffect(() => {
    const iconsReady = Array.isArray(tileIcons) && tileIcons.length > 0;
    const panelsReady = Array.isArray(panelData) && panelData.length > 0;

    if (!iconsReady || !panelsReady) {
      dispatch(setReadyToView(false));
      return;
    }

    const hasDefaultTileIcon =
      defaultTiles.length === 0 ||
      defaultTiles.some((tKey) => tileIcons.some((icon) => icon.key === tKey));

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
