// customHooks/permalink/useMapPermalinkSync.js
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { buildMapPermalink } from 'utils/mapPermalink';
import { setPermalink, setIsPermalinkClick } from 'store';

function hasValidPos(pos) {
  return pos && typeof pos.lat === 'number' && typeof pos.lng === 'number';
}

export default function useMapPermalinkSync({
  mapParRef,
  vectorName,
  mapPagePosition,
  lastPanelDisplayed,
  tileArray,
  isPermalinkClick, // MUST be real from store (selector or directorFun)
}) {
  const dispatch = useDispatch();

  const buildLink = useCallback(() => {
    const p = mapParRef.current;
    if (!p?.map || !vectorName) return '';

    const map = p.map;
    const viewCenter = map.getCenter();
    const zoom = map.getZoom();

    const clickPos = hasValidPos(mapPagePosition) ? mapPagePosition : null;

    const tileKey =
      Array.isArray(tileArray) && tileArray.length > 0
        ? tileArray.join(':')
        : undefined;

    return buildMapPermalink({
      vectorName,
      viewCenter,
      clickPos,
      zoom,
      panelKey: lastPanelDisplayed,
      tileKey,
      pathname: '/MapPage',
    });
  }, [mapParRef, vectorName, mapPagePosition, lastPanelDisplayed, tileArray]);

  const sync = useCallback(() => {
    const link = buildLink();
    if (link) dispatch(setPermalink(link));
  }, [buildLink, dispatch]);

  // 1) attach map events that should update permalink
  useEffect(() => {
    const p = mapParRef.current;
    if (!p?.map) return;

    const map = p.map;

    const onMoveEnd = () => sync();
    const onZoomEnd = () => sync(); // optional if you want explicit
    const onResize = () => sync();

    map.on('moveend', onMoveEnd);
    map.on('zoomend', onZoomEnd);
    map.on('resize', onResize);

    // initial
    sync();

    return () => {
      map.off('moveend', onMoveEnd);
      map.off('zoomend', onZoomEnd);
      map.off('resize', onResize);
    };
  }, [mapParRef, sync]);

  // 2) whenever click/panel/tiles change, sync once
  useEffect(() => {
    sync();
  }, [sync]);

  // 3) permalink hydration marker (one-shot, after map exists)
  useEffect(() => {
    let timeoutId = null;
    let tries = 0;

    const run = () => {
      const p = mapParRef.current;
      if (!p?.map) {
        if (tries++ < 40) timeoutId = setTimeout(run, 50);
        return;
      }

      if (!vectorName) return;
      if (!isPermalinkClick) return;
      if (!hasValidPos(mapPagePosition)) return;

      const iconOnMap = p.iconMarker && p.map.hasLayer(p.iconMarker);
      const rectOnMap = p.rectMarker && p.map.hasLayer(p.rectMarker);

      if (!iconOnMap && !rectOnMap) {
        // null prevents toggle-off
        PackageMapServices.clickMap(
          { latlng: { lat: mapPagePosition.lat, lng: mapPagePosition.lng } },
          mapParRef,
          vectorName,
          dispatch,
          null,
          'left'
        );
      }

      dispatch(setIsPermalinkClick(false)); // consume
    };

    run();
    return () => timeoutId && clearTimeout(timeoutId);
  }, [mapParRef, vectorName, mapPagePosition, isPermalinkClick, dispatch]);
}
