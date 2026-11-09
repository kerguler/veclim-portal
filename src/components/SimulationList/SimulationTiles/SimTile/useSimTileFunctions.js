import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAlbochickStatus } from 'store';
import useSimulationListPolling, {
  IN_PROGRESS_STATUSES,
} from 'customHooks/useSimulationListPolling';
export { IN_PROGRESS_STATUSES };
const STALLED_POLL_THRESHOLD = 2;
const FAILURE_CODE_MESSAGES = {
  OOM_KILLED:
    'This simulation ran out of memory on the server. Please try again.',
  TIME_LIMIT_EXCEEDED:
    'This simulation took too long to complete and was stopped.',
  NETWORK_ERROR:
    'Could not reach the climate data service. Please try again shortly.',
  UPSTREAM_UNREACHABLE:
    'Could not reach the climate data service. Please try again shortly.',
  UPSTREAM_TIMEOUT:
    'The climate data service took too long to respond. Please try again shortly.',
  POLL_TIMEOUT: 'This simulation did not complete in time.',
  CANCELLED: 'This simulation was cancelled.',
  BAD_REQUEST: 'This simulation request was invalid.',
  MISSING_CHILD: 'This simulation could not be tracked. Please try again.',
  TASK_FAILED: 'Something went wrong while running this simulation.',
  DEFAULT: 'Something went wrong while running this simulation.',
};
const DEFAULT_NO_DATA_REASON =
  'This simulation completed but produced no data for this location.';

function looksLikeRawExceptionText(text) {
  if (!text) return false;
  return /line \d+ column \d+|char \d+\)|traceback|[a-z.]+error[:(]|expecting value/i.test(
    text
  );
}
function useSimTileFunctions(sim) {
  const dispatch = useDispatch();
  const [isAlboChik, setIsAlboChik] = useState(false);
  const [isPollStalled, setIsPollStalled] = useState(false);
  const { error: simListError, refetch } = useSimulationListPolling();
  const simRecord = sim;
  const pollingActive = IN_PROGRESS_STATUSES.includes(simRecord?.status);

  useEffect(() => {
    setIsPollStalled(Boolean(simListError) && pollingActive);
  }, [simListError, pollingActive]);

  useEffect(() => {
    if (sim.model_type === 'model_albochik') {
      setIsAlboChik(true);
    }
  }, [sim.model_type]);

  const isHardFailure =
    simRecord?.status === 'FAILURE' || simRecord?.status === 'FAILED';
  const isCompleted =
    simRecord?.status === 'SUCCESS' || simRecord?.status === 'COMPLETED';
  const hasData = simRecord?.success === 1 || simRecord?.success === true;
  const isNoDataCompletion = isCompleted && !hasData;
  const isFailureState = isHardFailure || isNoDataCompletion;
  const errorMessage = isHardFailure
    ? FAILURE_CODE_MESSAGES[simRecord?.errors?.code] ||
      FAILURE_CODE_MESSAGES.DEFAULT
    : isNoDataCompletion
      ? looksLikeRawExceptionText(simRecord?.reason)
        ? DEFAULT_NO_DATA_REASON
        : simRecord?.reason || DEFAULT_NO_DATA_REASON
      : null;
  const displayViewIcon = isCompleted && hasData;

  useEffect(() => {
    if (!simRecord) return;
    if (pollingActive) {
      dispatch(setAlbochickStatus('PENDING'));
    } else if (isCompleted && hasData) {
      dispatch(setAlbochickStatus('SUCCESS'));
    }
  }, [simRecord?.status, pollingActive, isCompleted, hasData, dispatch]);

  return {
    simRecord,
    simListError,
    isPollStalled,
    refetch,
    isAlboChik,
    displayViewIcon,
    isFailureState,
    errorMessage,
  };
}
export { STALLED_POLL_THRESHOLD };
export default useSimTileFunctions;
