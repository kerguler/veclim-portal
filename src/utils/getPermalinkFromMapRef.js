// utils/getPermalinkFromMapRef.js
import { buildMapPermalink } from 'utils/mapPermalink';

export function getPermalinkFromMapRef({
  mapParRef,
  vectorName,
  lastPanelDisplayed,
  tileArray,
}) {
  const p = mapParRef.current;
  if (!p?.map || !vectorName) return '';

  const map = p.map;
  const viewCenter = map.getCenter();
  const zoom = map.getZoom();

  // ✅ THIS is the latest snapped click, even before Redux updates
  const clickPos = p.prevClickPointRef
    ? { lat: p.prevClickPointRef.lat, lng: p.prevClickPointRef.lng }
    : null;

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
}
