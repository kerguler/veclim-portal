// utils/mapPermalink.js
export function buildMapPermalink({
  vectorName,
  viewCenter,   // {lat, lng} – camera center
  clickPos,     // {lat, lng} – snapped grid cell (mapPagePosition)
  zoom,
  panelKey,
  tileKey,
  pathname = '/MapPage',
}) {
  const params = new URLSearchParams();

  if (vectorName) params.set('session', vectorName);

  // camera
  if (viewCenter) {
    params.set('cLat', viewCenter.lat.toFixed(4));
    params.set('cLon', viewCenter.lng.toFixed(4));
  }

  // clicked point (for panels)
  if (clickPos) {
    params.set('lat', clickPos.lat.toFixed(4));
    params.set('lon', clickPos.lng.toFixed(4));
  }

  if (typeof zoom === 'number') params.set('z', zoom.toString());
  if (panelKey) params.set('panel', panelKey);
  if (tileKey) params.set('tile', tileKey); // value "a:b" is fine

  return `${pathname}?${params.toString()}`;
}
