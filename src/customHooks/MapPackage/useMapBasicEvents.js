// customHooks/MapPackage/useMapBasicEvents.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDirectInitError } from 'store';

import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useAlboData } from 'context/AlboDataContext';
import useDirectorFun from 'customHooks/useDirectorFun';
import {
  setCurrentMapCenter,
  setCurrentMapZoom,
} from 'store/slices/searchLocationSlice';
import { syncReduxFromLeaflet } from 'utils/syncReduxFromLeaflet';
function useMapBasicEvents(mapParRef, fitworld, onContextMenu) {
  const dispatch = useDispatch();
  const {
    directInitError,
    vectorName,
    mapPagePosition, // snapped cell
    lastPanelDisplayed,
    tileArray,openItems
  } = useDirectorFun('left');

  const { setDataSim } = useAlboData();

  useEffect(() => {
    const p = mapParRef.current;
    if (!p || !p.map) return;

    const map = p.map;

    // MAP EVENTS ------------------------

    const handleMapClick = (e) => {
      setDataSim(null);

      PackageMapServices.handleMapClick(
        e,
        mapParRef,
        vectorName,
        dispatch,
        null, // directMap
        mapPagePosition, // current mapPagePosition
        'left',
   
      );
    };

    const handleMoveEnd = () => {
      syncReduxFromLeaflet(mapParRef, dispatch);
    };

    const handleMouseOut = () => {
      PackageMapServices.mouseOut(mapParRef);
    };

    const handleResize = () => {
      try {
        PackageMapServices.resizeMap(mapParRef, vectorName, dispatch);
      } catch (error) {
        dispatch(
          setDirectInitError({
            direction: 'left',
            value: {
              ...directInitError,
              message: error.message,
            },
          })
        );
      }
    };

    const handleContextMenu = (e) => {
      if (
        e.originalEvent &&
        typeof e.originalEvent.preventDefault === 'function'
      ) {
        e.originalEvent.preventDefault();
      }
    };

    map.on('click', handleMapClick);
    map.on('mouseout', handleMouseOut);
    map.on('resize', handleResize);
    map.on('moveend', handleMoveEnd);
    map.on('contextmenu', handleContextMenu);
    map.on('zoomend', handleMoveEnd);

    // initial sync

    return () => {
      if (!map) return;
      map.off('click', handleMapClick);
      map.off('mouseout', handleMouseOut);
      map.off('resize', handleResize);
      map.off('moveend', handleMoveEnd);
      map.off('contextmenu', handleContextMenu);
      map.off('zoomend', handleMoveEnd);
    };
  }, [
    dispatch,
    mapParRef,
    vectorName,
    mapPagePosition,
    lastPanelDisplayed,
    tileArray,
    directInitError,
    setDataSim,
    onContextMenu,openItems
  ]);

  // whenever snapped click / panel / tiles change, rebuild permalink once
  useEffect(() => {
    const p = mapParRef.current;
    if (!p || !p.map || !vectorName) return;

    const map = p.map;
    const viewCenter = map.getCenter();
    const zoom = map.getZoom();

    const clickPos =
      mapPagePosition &&
      typeof mapPagePosition.lat === 'number' &&
      typeof mapPagePosition.lng === 'number'
        ? { lat: mapPagePosition.lat, lng: mapPagePosition.lng }
        : null;

    const tileKey =
      Array.isArray(tileArray) && tileArray.length > 0
        ? tileArray.join(':')
        : undefined;
  }, [
    mapPagePosition,
    lastPanelDisplayed,
    tileArray,
    vectorName,
    mapParRef,
    dispatch,
  ]);

  // fit world unchanged
  useEffect(() => {
    const p = mapParRef.current;
    if (!p || !p.map) return;

    if (fitworld) {
      p.map.setView(PackageMapServices.defaultWorldCenter, 1);
      p.map.fitWorld();
    }
  }, [fitworld, mapParRef]);
}

export default useMapBasicEvents;
