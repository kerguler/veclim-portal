// src/utils/mapPermalink.js

export function buildMapPermalink({
  vectorName,
  center,
  zoom,
  panelKey,
  tileKey,
  pathname = '/MapPage',

}) {
  const params = new URLSearchParams();

  // Vector/session
  if (vectorName) {
    params.set('session', vectorName);
  }

  // Center
  if (center && center.lat != null && center.lng != null) {
    const latNum = Number(center.lat);
    const lngNum = Number(center.lng);

    if (!Number.isNaN(latNum) && !Number.isNaN(lngNum)) {
      params.set('lat', latNum.toFixed(4));
      params.set('lon', lngNum.toFixed(4));
    }
  }

  // Zoom
  if (typeof zoom === 'number') {
    params.set('z', String(zoom));
  }
  if (panelKey) {
    params.set('panel', panelKey);
  }
    if (tileKey) {
    params.set('tile', tileKey);
  }
  const base = `${window.location.origin}${pathname}`;
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}
