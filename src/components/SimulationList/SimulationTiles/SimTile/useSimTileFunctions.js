import { useState } from 'react';
import { useGetSimulationListQuery } from 'store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAlbochickStatus } from 'store';
import { useRef } from 'react';
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
  const [displayViewIcon, setDisplayViewIcon] = useState(false);
  const [pollingActive, setPollingActive] = useState(false);
  const [isPollStalled, setIsPollStalled] = useState(false);
  const consecutiveFailuresRef = useRef(0);
  const {
    data: simRecord,
    isFetching: isSimListFetching,
    error: simListError,
    refetch,
  } = useGetSimulationListQuery({ id: sim.id, return_results: false });
  useEffect(() => {
    if (!pollingActive) return;
    const interval = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [pollingActive, refetch]);

  useEffect(() => {
    if (!pollingActive) {
      consecutiveFailuresRef.current = 0;
      setIsPollStalled(false);
      return;
    }
    if (simListError) {
      consecutiveFailuresRef.current += 1;
      if (consecutiveFailuresRef.current >= STALLED_POLL_THRESHOLD) {
        setIsPollStalled(true);
      }
    } else {
      consecutiveFailuresRef.current = 0;
      setIsPollStalled(false);
    }
  }, [simListError, pollingActive]);
  useEffect(() => {
    if (!simRecord) return;
    const isPendingSim =
      simRecord.status === 'PENDING' || simRecord.status === 'STARTED';
    setPollingActive(isPendingSim);
  }, [simRecord, dispatch]);

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

  useEffect(() => {
    if (simRecord) {
      if (simRecord.status === 'PENDING' || simRecord.status === 'STARTED') {
        setDisplayViewIcon(false);
        dispatch(setAlbochickStatus('PENDING'));
      } else if (isCompleted && hasData) {
        setDisplayViewIcon(true);
        dispatch(setAlbochickStatus('SUCCESS'));
      } else {
        setDisplayViewIcon(false);
      }
    }
  }, [sim.status, simRecord, dispatch, isCompleted, hasData]);

  return {
    simRecord,
    isSimListFetching,
    simListError,
    isPollStalled,
    refetch,
    isAlboChik,
    displayViewIcon,
    isFailureState,
    errorMessage,
  };
}
export default useSimTileFunctions;
