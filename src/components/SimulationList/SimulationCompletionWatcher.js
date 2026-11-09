import { useEffect, useRef } from 'react';
import { useGetSimulationListQuery } from 'store';
import { simulationApi } from 'store/apis/simulationApi';
import { useAlboData } from 'context/AlboDataContext';
import {
  IN_PROGRESS_STATUSES,
  getPollInterval,
} from 'customHooks/useSimulationListPolling';

const LIST_ARG = { return_results: false };

function SimulationCompletionWatcher() {
  const { setListAttention } = useAlboData();
  const { data: cached } =
    simulationApi.endpoints.getSimulationList.useQueryState(LIST_ARG);
  const interval = getPollInterval(cached);

  const { data } = useGetSimulationListQuery(LIST_ARG, {
    skip: !cached,
    pollingInterval: interval,
    skipPollingIfUnfocused: true,
  });

  const previous = useRef(null);

  useEffect(() => {
    if (!Array.isArray(data)) return;
    const next = {};
    let finishedCount = 0;
    data.forEach((sim) => {
      next[sim.id] = sim.status;
      const before = previous.current?.[sim.id];
      if (
        before &&
        IN_PROGRESS_STATUSES.includes(before) &&
        !IN_PROGRESS_STATUSES.includes(sim.status)
      ) {
        finishedCount += 1;
      }
    });
    previous.current = next;
    if (finishedCount > 0) setListAttention((count) => count + finishedCount);
  }, [data, setListAttention]);

  return null;
}

export default SimulationCompletionWatcher;
