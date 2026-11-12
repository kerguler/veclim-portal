import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetSimulationListQuery } from 'store';
import useIsStaff from 'customHooks/useIsStaff';
import {
  IN_PROGRESS_STATUSES,
  getPollInterval,
} from 'customHooks/useSimulationListPolling';
import { syncAttention, resetAttention } from 'utils/simulationAttention';

const LIST_ARG = { return_results: false };

function SimulationCompletionWatcher() {
  const { isLoggedIn, username } = useIsStaff();
  const apiReg = useSelector((s) => s.login.apiRegisterResponse);
  const signedIn = isLoggedIn || Boolean(apiReg?.userId);
  const userKey = username || apiReg?.userName || localStorage.getItem('username');

  const { data } = useGetSimulationListQuery(LIST_ARG, { skip: !signedIn });
  const interval = getPollInterval(data);

  useGetSimulationListQuery(LIST_ARG, {
    skip: !signedIn || !interval,
    pollingInterval: interval,
    skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (!signedIn) {
      resetAttention();
      return;
    }
    if (!Array.isArray(data)) return;
    syncAttention(userKey, data, IN_PROGRESS_STATUSES);
  }, [signedIn, data, userKey]);

  return null;
}

export default SimulationCompletionWatcher;
