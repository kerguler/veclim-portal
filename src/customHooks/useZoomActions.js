import { useEffect } from 'react';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useDirectorFun from './useDirectorFun';

function useZoomActions(mapParRef) {
  const { vectorName, mapVector } = useDirectorFun('left');
  const mapPagePosition = useSelector((state) => state.fetcher.fetcherStates.map.mapPagePosition);
  const switchMap = useSelector((state) => state.fetcher.fetcherStates.map.switchMap);
  let p = mapParRef.current;
  const dispatch = useDispatch();
  useEffect(() => {
    const handleMarkers = () => {
      PackageMapServices.markerHandler(mapParRef, 4, mapVector, dispatch, mapPagePosition);
    };
    p.map.on('zoomend', handleMarkers);

    handleMarkers();

    return () => {
      p.map.off('zoomend', handleMarkers);
    };
  }, [mapVector, p.map, mapParRef, dispatch, switchMap, mapVector]);
}

export default useZoomActions;
