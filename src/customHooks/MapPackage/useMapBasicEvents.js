import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMapCenter, setCurrentMapZoom, setDirectInitError } from 'store';

import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useAlboData } from 'context/AlboDataContext';
import useDirectorFun from 'customHooks/useDirectorFun';
import { setDisplaySimulationPanel } from 'store';
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
  let p = mapParRef.current;
  useEffect(() => {
    const handleMapClick = (e) => {
      setDataSim(null);

      if (panelInterfere === 0 && !invalidateSimData) {
        dispatch(setDisplaySimulationPanel({ direction: 'left', value: 'location_info_panel' }));
      }

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

    const handleMove = () => {
      let tempC = p.map.getCenter();
      let tempZ = p.map.getZoom();
      p.zoom = tempZ;
      p.center = [tempC.lat, tempC.lng];
      dispatch(setCurrentMapZoom(tempZ));
      dispatch(setCurrentMapCenter({ lat: tempC.lat, lng: tempC.lng }));
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

    p.map.on('click', handleMapClick);
    p.map.on('mouseout', handleMouseOut);
    p.map.on('resize', handleResize);
    p.map.on('move', handleMove);
    return () => {
      p.map.off('click', handleMapClick);
      p.map.off('mouseout', handleMouseOut);
      p.map.off('resize', handleResize);
      p.map.off('move', handleMove);
      p.map.off('mouseout', PackageMapServices.mouseOut, true);
    };
  }, [dispatch, mapParRef, p, vectorName, mapPagePosition, invalidateSimData]);

  useEffect(() => {
    if (fitworld) {
      p.map.setView(PackageMapServices.defaultWorldCenter, 1);
      p.map.fitWorld();
    }
  }, [fitworld, p.map]);
}

export default useMapBasicEvents;
