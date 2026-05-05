import { useDispatch } from 'react-redux';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useEffect } from 'react';
import { setCurrentMapCenter, setCurrentMapZoom, setDirectMap } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

const useConsumeDirectMap = (consumedDirectMapRef, mapParRef) => {
  const dispatch = useDispatch();
  const { directMap, mapVector, mapPagePosition } = useDirectorFun('left');
  useEffect(() => {
    const isActive =
      directMap?.display !== -2 &&
      directMap?.display != null &&
      Number.isFinite(directMap?.lat) &&
      Number.isFinite(directMap?.lon);

    if (!isActive) return;

    const key = `${directMap.lat}:${directMap.lon}:${directMap.display}`;
    if (consumedDirectMapRef.current === key) return;
    consumedDirectMapRef.current = key;

    const hasDirectCenter =
      Number.isFinite(directMap?.center?.lat) &&
      Number.isFinite(directMap?.center?.lng);

    const targetCenter = hasDirectCenter
      ? directMap.center
      : { lat: directMap.lat, lng: directMap.lon };

    const e = {
      latlng: {
        lat: directMap.lat,
        lng: directMap.lon,
      },
    };
    const map = mapParRef.current?.map;

    if (
      map &&
      Number.isFinite(targetCenter.lat) &&
      Number.isFinite(targetCenter.lng)
    ) {
      map.setView(
        targetCenter,
        Number.isFinite(directMap?.zoom) ? directMap.zoom : map.getZoom(),
        { animate: false }
      );
    }

    dispatch(setCurrentMapCenter(targetCenter));

    if (Number.isFinite(directMap?.zoom)) {
      dispatch(setCurrentMapZoom(directMap.zoom));
    }
    PackageMapServices.handleMapClick(
      e,
      mapParRef,
      mapVector,
      dispatch,
      directMap,
      mapPagePosition,
      'left',
      {
        invalidateSimData: false,
        allowSamePointToggleOff: false,
        isProgrammatic: true,
        resetDataArrived: false,
      }
    );

    dispatch(
      setDirectMap({
        direction: 'left',
        value: {
          lat: null,
          lon: null,
          display: -2,
          center: null,
          zoom: null,
        },
      })
    );
  }, [
    directMap,
    mapVector,
    dispatch,
    mapPagePosition,
    consumedDirectMapRef,
    mapParRef,
  ]);
};
export default useConsumeDirectMap;
