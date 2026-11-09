const PARAM_ROWS = [
  { index: 3, label: 'Human population size' },
  { index: 4, label: 'Days to run transmission' },
  { index: 5, label: 'Number of repetitions' },
  { index: 6, label: 'Vec/human scaling', format: (v) => Math.round(v * 100) },
  { index: 7, label: 'Personal protection' },
  { index: 8, label: 'Vector control delay' },
];

export function describeSimulationParams(modelData) {
  const pr = modelData?.pr;
  if (!Array.isArray(pr)) return [];
  return PARAM_ROWS.filter((row) => pr[row.index] !== undefined).map((row) => ({
    label: row.label,
    value: row.format ? row.format(pr[row.index]) : pr[row.index],
  }));
}

export function getSimulationCoordinates(modelData) {
  const pr = modelData?.pr;
  const lng = Number(pr?.[1]);
  const lat = Number(pr?.[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}
