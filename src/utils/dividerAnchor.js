export function getDividerLng(p) {
  const control = p?.sideBySide;
  const map = control?._map;
  if (!map || !control._range || !map._loaded) return undefined;
  try {
    const point = [control.getPosition(), map.getSize().y / 2];
    const lng = map.containerPointToLatLng(point).lng;
    return Number.isFinite(lng) ? lng : undefined;
  } catch (e) {
    return undefined;
  }
}

export function setDividerFromLng(p, lng) {
  const control = p?.sideBySide;
  const map = control?._map;
  if (!map || !control._range || !map._loaded || !Number.isFinite(lng)) {
    return null;
  }
  try {
    const width = map.getSize().x;
    const { padding = 0, thumbSize = 42 } = control.options || {};
    const span = 2 * padding + thumbSize;
    if (width <= span) return null;
    const x = map.latLngToContainerPoint([map.getCenter().lat, lng]).x;
    const ratio = Math.min(1, Math.max(0, (x - span / 2) / (width - span)));
    control._range.value = ratio;
    control._updateClip();
    return ratio;
  } catch (e) {
    return null;
  }
}
