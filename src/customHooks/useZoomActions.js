// useZoomActions.js
import { useEffect } from 'react';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useDispatch, useSelector } from 'react-redux';
import useDirectorFun from './useDirectorFun';

function useZoomActions(mapParRef) {
  const { vectorName, mapVector } = useDirectorFun('left');
  const mapPagePosition = useSelector(
    (state) => state.fetcher.fetcherStates.map.mapPagePosition
  );
  const switchMap = useSelector(
    (state) => state.fetcher.fetcherStates.map.switchMap
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const p = mapParRef.current;
    if (!p || !p.map) return;

    const handleMarkers = () => {
      PackageMapServices.markerHandler(
        mapParRef,
        4,
        mapVector,
        dispatch,
        mapPagePosition
      );
    };

    p.map.on('zoomend', handleMarkers);
    // initial positioning of markers
    handleMarkers();

    return () => {
      p.map.off('zoomend', handleMarkers);
    };
  }, [mapVector, dispatch, mapParRef, switchMap, mapPagePosition]);
}

export default useZoomActions;
