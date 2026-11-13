import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMapPagePosition, setPersistPointer } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
import useQuery from 'customHooks/fethcerStates/useQuery';
import { getVector } from 'vectors/registry';

const LOCATION_WAIT_MS = 4000;
const SAME_CELL_DEGREES = 0.3;

let autoCell = null;
let appliedFor = null;

const isValidCell = (pos) =>
  Number.isFinite(pos?.lat) && Number.isFinite(pos?.lng);

const isNear = (a, b) =>
  isValidCell(a) &&
  isValidCell(b) &&
  Math.abs(a.lat - b.lat) < SAME_CELL_DEGREES &&
  Math.abs(a.lng - b.lng) < SAME_CELL_DEGREES;

const hasMarkerOnMap = (p) => {
  const map = p?.map;
  if (!map) return false;
  return Boolean(
    (p.iconMarker && map.hasLayer(p.iconMarker)) ||
      (p.rectMarker && map.hasLayer(p.rectMarker))
  );
};

function useInitialCell(mapParRef) {
  const dispatch = useDispatch();
  const { mapVector, mapPagePosition } = useDirectorFun('left');
  const { lat: urlLat, lon: urlLon } = useQuery();
  const userLocation = useSelector(
    (state) => state.fetcher.fetcherStates.map.userLocation
  );
  const [waitedForLocation, setWaitedForLocation] = useState(false);

  const urlHasCell = urlLat !== null && urlLon !== null;
  const cellIsEmpty = !isValidCell(mapPagePosition);
  const cellIsAuto = isNear(mapPagePosition, autoCell);

  useEffect(() => {
    setWaitedForLocation(false);
    const timer = setTimeout(() => setWaitedForLocation(true), LOCATION_WAIT_MS);
    return () => clearTimeout(timer);
  }, [mapVector]);

  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map || !mapVector || urlHasCell) return;
    if (!cellIsEmpty && !cellIsAuto) return;
    if (cellIsEmpty && appliedFor === mapVector) return;

    const cfg = getVector(mapVector)?.map || {};
    const locationReady = userLocation?.status === 'granted';
    const wantsUserLocation = cfg.overrideUserLocation === false;

    let target = null;
    if (wantsUserLocation && locationReady) {
      target = { lat: userLocation.lat, lng: userLocation.lng };
    } else if (
      !wantsUserLocation ||
      userLocation?.status === 'unavailable' ||
      waitedForLocation
    ) {
      target = cfg.defaultClickPosition || cfg.defaultCenter || null;
    }
    if (!target) return;
    if (isNear(mapPagePosition, target) && hasMarkerOnMap(p)) return;

    autoCell = { lat: target.lat, lng: target.lng };
    appliedFor = mapVector;
    dispatch(setMapPagePosition({ lat: target.lat, lng: target.lng }));
    dispatch(setPersistPointer({ direction: 'left', value: true }));
    if (wantsUserLocation && locationReady) {
      p.map.setView([target.lat, target.lng], p.map.getZoom(), {
        animate: false,
      });
    }
  }, [
    mapParRef,
    mapVector,
    urlHasCell,
    cellIsEmpty,
    cellIsAuto,
    mapPagePosition?.lat,
    mapPagePosition?.lng,
    userLocation,
    waitedForLocation,
    dispatch,
  ]);

  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map || !isValidCell(mapPagePosition)) return;
    if (hasMarkerOnMap(p)) return;
    dispatch(setPersistPointer({ direction: 'left', value: true }));
  }, [mapParRef, mapPagePosition?.lat, mapPagePosition?.lng, dispatch]);
}

export default useInitialCell;
