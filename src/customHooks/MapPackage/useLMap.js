import { useEffect } from 'react';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { setCurrentMapBounds } from 'store';
import useDirectorFun from 'customHooks/useDirectorFun';

function useLMap(mapParRef) {
  const dispatch = useDispatch();
  const { permalinkClick } = useDirectorFun('left');
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
      maxBoundsViscosity: 0,
      maxBounds: PackageMapServices.worldBounds,
      zoomControl: false,
      minZoom: 3,
    });

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
      map.setMaxBounds(null);
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

    const baseLayer = PackageMapServices.baseLayer;
    const baseLayerOSM = PackageMapServices.baseLayerOSM;
    const dataLayer = PackageMapServices.dataLayer;

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
  }, [mapParRef, showVectorAbundance, showMapLabels]);
}

export default useLMap;
