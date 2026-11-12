const LEGACY_PR_LENGTH = 9;

const PARAM_ROWS = [
  { index: 2, label: 'Human population size' },
  { index: 3, label: 'Days to run transmission' },
  { index: 4, label: 'Number of repetitions' },
  { index: 5, label: 'Vec/human scaling', format: (v) => Math.round(v * 100) },
  { index: 6, label: 'Personal protection' },
  { index: 7, label: 'Vector control delay' },
];

const prOffset = (pr) => (pr.length === LEGACY_PR_LENGTH ? 1 : 0);

export function describeSimulationParams(modelData) {
  const pr = modelData?.pr;
  if (!Array.isArray(pr)) return [];
  const offset = prOffset(pr);
  return PARAM_ROWS.filter((row) => pr[row.index + offset] !== undefined).map((row) => ({
    label: row.label,
    value: row.format ? row.format(pr[row.index + offset]) : pr[row.index + offset],
  }));
}

export function getSimulationCoordinates(modelData) {
  const pr = modelData?.pr;
  if (!Array.isArray(pr)) return null;
  const offset = prOffset(pr);
  const lng = Number(pr[offset]);
  const lat = Number(pr[offset + 1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}
