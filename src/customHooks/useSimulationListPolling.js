import { useGetSimulationListQuery } from 'store';

export const IN_PROGRESS_STATUSES = [
  'PENDING',
  'QUEUED',
  'PARSING',
  'STARTED',
  'RUNNING',
];

const GIVE_UP_AFTER_MS = 15 * 60 * 1000;

export function getPollInterval(list) {
  if (!Array.isArray(list)) return 0;
  const now = Date.now();
  let youngest = null;
  for (const sim of list) {
    if (!IN_PROGRESS_STATUSES.includes(sim.status)) continue;
    const age = now - new Date(sim.created_at).getTime();
    if (!Number.isFinite(age) || age > GIVE_UP_AFTER_MS) continue;
    if (youngest === null || age < youngest) youngest = age;
  }
  if (youngest === null) return 0;
  if (youngest < 60 * 1000) return 3000;
  if (youngest < 5 * 60 * 1000) return 5000;
  return 10000;
}

export default function useSimulationListPolling(extraInterval = 0) {
  const result = useGetSimulationListQuery(
    { return_results: false },
    { pollingInterval: 0 }
  );
  const interval = getPollInterval(result.data);
  const effective =
    interval && extraInterval
      ? Math.min(interval, extraInterval)
      : interval || extraInterval;
  return useGetSimulationListQuery(
    { return_results: false },
    { pollingInterval: effective, skipPollingIfUnfocused: true }
  );
}
