// useMapBasicEvents.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  // setCurrentMapCenter,
  // setCurrentMapZoom,
  setDirectInitError,
} from 'store';

import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useAlboData } from 'context/AlboDataContext';
import useDirectorFun from 'customHooks/useDirectorFun';
import { setDisplaySimulationPanel } from 'store';
import { setLastPanelDisplayed } from 'components/mapMenu/menuStore/mapMenuSlice';

function useMapBasicEvents(mapParRef, fitworld) {
  const dispatch = useDispatch();
  const {
    directInitError,
    vectorName,
    panelInterfere,
    invalidateSimData,
    mapPagePositionLeft: mapPagePosition,
  } = useDirectorFun('left');

  const { setDataSim } = useAlboData();

  useEffect(() => {
    const p = mapParRef.current;
    if (!p || !p.map) return;

    const handleMapClick = (e) => {
      setDataSim(null);

      PackageMapServices.handleMapClick(
        e,
        mapParRef,
        vectorName,
        dispatch,
        null,
        null,
        mapPagePosition,
        'left'
      );
    };

    const handleMoveEnd = () => {
      const map = p.map;
      if (!map) return;

      const tempC = map.getCenter();
      const tempZ = map.getZoom();
      p.zoom = tempZ;
      p.center = [tempC.lat, tempC.lng];

      // IMPORTANT: do NOT dispatch on every moveend – this causes feedback loops
      // dispatch(setCurrentMapZoom(tempZ));
      // dispatch(setCurrentMapCenter({ lat: tempC.lat, lng: tempC.lng }));
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

    // attach once
    p.map.on('click', handleMapClick);
    p.map.on('mouseout', handleMouseOut);
    p.map.on('resize', handleResize);
    p.map.on('moveend', handleMoveEnd);

    // clean up ALL handlers properly
    return () => {
      if (!p.map) return;
      p.map.off('click', handleMapClick);
      p.map.off('mouseout', handleMouseOut);
      p.map.off('resize', handleResize);
      p.map.off('moveend', handleMoveEnd);
    };
  }, [
    dispatch,
    mapParRef,
    vectorName,
    mapPagePosition,
    invalidateSimData,
    directInitError,
    setDataSim,
  ]);

  // fit-world behaviour
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
