function hasValidPosition(pos) {
  return Number.isFinite(pos?.lat) && Number.isFinite(pos?.lng);
}

function isPointInBounds(pos, bounds) {
  if (!hasValidPosition(pos) || !bounds) return false;

  const [[minLat, minLng], [maxLat, maxLng]] = bounds;

  return (
    pos.lat >= minLat &&
    pos.lat <= maxLat &&
    pos.lng >= minLng &&
    pos.lng <= maxLng
  );
}

export { hasValidPosition, isPointInBounds };
