// useMapBasicEvents.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDirectInitError } from 'store';

import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useAlboData } from 'context/AlboDataContext';
import useDirectorFun from 'customHooks/useDirectorFun';

import { buildMapPermalink } from 'utils/mapPermalink';

function useMapBasicEvents(mapParRef, fitworld, onContextMenu) {
  const dispatch = useDispatch();
  const {
    directInitError,
    vectorName,
    panelInterfere,
    invalidateSimData,
    mapPagePositionLeft: mapPagePosition,
    lastPanelDisplayed,
    tileIcons, // 🔹 make sure useDirectorFun returns this
    tileArray,
  } = useDirectorFun('left');

  const { setDataSim } = useAlboData();

  useEffect(() => {
    const p = mapParRef.current;
    if (!p || !p.map) return;

    const map = p.map;

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
      const tempC = map.getCenter();
      const tempZ = map.getZoom();
      p.zoom = tempZ;
      p.center = [tempC.lat, tempC.lng];
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

    // 🔹 Right-click → delegate to React via onContextMenu
    const handleContextMenu = (e) => {
      if (
        e.originalEvent &&
        typeof e.originalEvent.preventDefault === 'function'
      ) {
        e.originalEvent.preventDefault();
      }

      const center =
        mapPagePosition &&
        mapPagePosition.lat != null &&
        mapPagePosition.lng != null
          ? mapPagePosition
          : map.getCenter();

      const zoom = map.getZoom();

      // 🔹 Build tile param from active tiles
      // Adjust the property name (isActive / selected / checked) to match your tileIcons
      const tileParam =
        Array.isArray(tileArray) && tileArray.length > 0
          ? tileArray.join(':')
          : undefined;

      const permalink = buildMapPermalink({
        vectorName,
        center: { lat: center.lat, lng: center.lng },
        zoom,
        panelKey: lastPanelDisplayed,
        tileKey: tileParam, // 🔹 include tiles here
        pathname: '/MapPage',
      });

      if (typeof onContextMenu === 'function') {
        const containerPoint = map.latLngToContainerPoint(e.latlng);

        onContextMenu({
          latlng: e.latlng,
          containerPoint,
          permalink,
          originalEvent: e.originalEvent,
        });
      }
    };

    map.on('click', handleMapClick);
    map.on('mouseout', handleMouseOut);
    map.on('resize', handleResize);
    map.on('moveend', handleMoveEnd);
    map.on('contextmenu', handleContextMenu);

    return () => {
      if (!map) return;
      map.off('click', handleMapClick);
      map.off('mouseout', handleMouseOut);
      map.off('resize', handleResize);
      map.off('moveend', handleMoveEnd);
      map.off('contextmenu', handleContextMenu);
    };
  }, [
    dispatch,
    mapParRef,
    vectorName,
    mapPagePosition,
    invalidateSimData,
    directInitError,
    setDataSim,
    lastPanelDisplayed,
    tileIcons, // 🔹 include so permalink updates if tiles change
    onContextMenu,
  ]);

  // fit-world behaviour unchanged
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
