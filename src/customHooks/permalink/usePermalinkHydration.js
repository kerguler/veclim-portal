// customHooks/permalink/usePermalinkHydration.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from 'customHooks/fethcerStates/useQuery';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import {
  setMapPagePosition,
  setCurrentMapCenter,
  setCurrentMapZoom,
  setCurrentMapBounds,
  setCurrentMaxBounds,
  setIsPermalinkClick, // you already added this
} from 'store';
import { getVector } from 'vectors/registry';

export default function usePermalinkHydration({ mapPagePosition }) {
  const dispatch = useDispatch();

  const { lon, lat, cLon, cLat, zoom, bounds } = useQuery();
  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );
  const vec = getVector(vectorName);

  // clicked point
  useEffect(() => {
    const hasLatLon = lat != null && lon != null && lat !== '' && lon !== '';
    if (hasLatLon) {
      dispatch(
        setMapPagePosition({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
        })
      );
      dispatch(setIsPermalinkClick(true));
    } else {
      dispatch(setIsPermalinkClick(false));
      // optionally clear stale click on normal /MapPage:
      // dispatch(setMapPagePosition({ lat: null, lng: null }));
    }
  }, [lat, lon, dispatch]);

  // camera center
  useEffect(() => {
    let center = null;

    const hasCam = cLat != null && cLon != null && cLat !== '' && cLon !== '';
    const hasClick = lat != null && lon != null && lat !== '' && lon !== '';

    if (hasCam) {
      center = { lat: parseFloat(cLat), lng: parseFloat(cLon) };
    } else if (hasClick) {
      center = { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      center = vec.map.defaultCenter;
    }

    if (center) dispatch(setCurrentMapCenter(center));
  }, [cLat, cLon, lat, lon, mapPagePosition, dispatch]);

  // zoom
  useEffect(() => {
    if (!zoom) return;
    const zNum = parseInt(zoom, 10);
    if (!Number.isNaN(zNum)) dispatch(setCurrentMapZoom(zNum));
  }, [zoom, dispatch]);

  // bounds
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
}
