import { useEffect } from 'react';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { setCurrentMapBounds } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';
import {
  BASEMAP_MAX_ZOOM,
  OSM_MAX_ZOOM,
  mapBasemapKey,
} from 'components/map/mapPackage/basemaps';

function useLMap(mapParRef) {
  const dispatch = useDispatch();
  const mapOptions = useSelector(
    (state) => state.fetcher.fetcherStates.map.optionsPanel
  );
  const { showVectorAbundance, showMapLabels } = mapOptions;

  const { vectorName, currentMapCenter, currentMapZoom, currentMaxBounds } =
    useDirectorFun('left');

  // 1) Create map once
  useEffect(() => {
    const p = mapParRef.current;
    if (!p || p.map) return;

    const map = L.map('map1', {
      maxBoundsViscosity: 1.0, // hard edge, no pan past bounds
      maxBounds: PackageMapServices.mercatorBounds,
      zoomControl: false,
      minZoom: 3,
    });
    PackageMapServices.fitWorldMinZoom(map);

    p.map = map;

    if (currentMapCenter && typeof currentMapZoom === 'number') {
      p.map.setView(
        { lat: currentMapCenter.lat, lng: currentMapCenter.lng },
        currentMapZoom
      );
    }

    const bounds = map.getBounds();
    if (bounds) {
      dispatch(
        setCurrentMapBounds([
          [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
          [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
        ])
      );
    }

    return () => {
      if (p.map) {
        p.map.remove();
        p.map = null;
      }
    };
  }, [mapParRef, dispatch]);

  // 2) Apply vector max bounds / constraints only when vector changes
  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map || !vectorName) return;

    PackageMapServices.mapBounds(mapParRef, vectorName, dispatch);
  }, [mapParRef, vectorName, dispatch]);

  // 3) Keep Leaflet maxBounds synced if Redux maxBounds changes

  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map) return;

    const map = p.map;

    if (!currentMaxBounds) {
      map.setMaxBounds(
        PackageMapServices.calculateBounds(PackageMapServices.mercatorBounds)
      );
      return;
    }

    const maxBounds = PackageMapServices.calculateBounds(currentMaxBounds);
    map.setMaxBounds(maxBounds);
  }, [mapParRef, currentMaxBounds]);

  // 4) Sync Redux center/zoom into Leaflet only when actually different
  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map) return;
    if (!currentMapCenter || typeof currentMapZoom !== 'number') return;

    const map = p.map;
    const leafletCenter = map.getCenter();
    const leafletZoom = map.getZoom();

    const sameCenter =
      Math.abs(leafletCenter.lat - currentMapCenter.lat) < 1e-9 &&
      Math.abs(leafletCenter.lng - currentMapCenter.lng) < 1e-9;

    const sameZoom = leafletZoom === currentMapZoom;

    if (!sameCenter || !sameZoom) {
      // map.setView(
      //   { lat: currentMapCenter.lat, lng: currentMapCenter.lng },
      //   currentMapZoom,
      //   { animate: false }
      // );
    }
  }, [mapParRef, currentMapCenter, currentMapZoom]);

  // 5) Base/data/label layers
  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map) return;
    const map = p.map;

    const baseLayer = PackageMapServices.getBaseLayerForVector(vectorName);
    const baseLayerOSM = PackageMapServices.baseLayerOSM;
    const dataLayer = PackageMapServices.dataLayer;

    // cap zoom where the basemap has tiles
    const key = mapBasemapKey(vectorName);
    map.setMaxZoom(
      showMapLabels ? OSM_MAX_ZOOM : BASEMAP_MAX_ZOOM[key] || BASEMAP_MAX_ZOOM.terrain
    );

    // drop other basemaps (vector changed)
    Object.values(PackageMapServices._baseCache).forEach((l) => {
      if (l !== baseLayer && map.hasLayer(l)) map.removeLayer(l);
    });

    if (!map.hasLayer(baseLayer) && !map.hasLayer(baseLayerOSM)) {
      baseLayer.addTo(map);
    }

    if (showVectorAbundance) {
      if (!map.hasLayer(dataLayer)) {
        dataLayer.addTo(map);
      }
    } else if (map.hasLayer(dataLayer)) {
      map.removeLayer(dataLayer);
    }

    if (showMapLabels) {
      if (!map.hasLayer(baseLayerOSM)) {
        baseLayerOSM.addTo(map);
      }
      if (map.hasLayer(baseLayer)) {
        map.removeLayer(baseLayer);
      }
    } else {
      if (!map.hasLayer(baseLayer)) {
        baseLayer.addTo(map);
      }
      if (map.hasLayer(baseLayerOSM)) {
        map.removeLayer(baseLayerOSM);
      }
    }
  }, [mapParRef, showVectorAbundance, showMapLabels, vectorName]);
}

export default useLMap;
