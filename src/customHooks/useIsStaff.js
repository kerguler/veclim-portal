import { useFetchCurrentUserQuery } from 'store';


function useIsStaff({ skip = false } = {}) {
  const { data, error, isLoading, isUninitialized, refetch } =
    useFetchCurrentUserQuery(undefined, {
      skip,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      pollingInterval: 60000,
    });

  const loggedIn = Boolean(data?.isAuthenticated) && !error;
  const grantedVectorIds = loggedIn ? data?.grantedDraftVectors || [] : [];
  const pendingVectorIds = loggedIn ? data?.pendingDraftVectors || [] : [];
  const deniedVectors = loggedIn
    ? Object.fromEntries(
        (data?.deniedDraftVectors || []).map((d) => [d.vectorId, d.retryAfterDays])
      )
    : {};

  return {
    isStaff: loggedIn && Boolean(data?.isStaff),
    isLoggedIn: loggedIn,
    isChecking: isLoading || isUninitialized,
    username: loggedIn ? data?.username : null,
    grantedVectorIds,
    pendingVectorIds,
    deniedVectors,
    canView: (vectorId) =>
      (loggedIn && Boolean(data?.isStaff)) || grantedVectorIds.includes(vectorId),
    refetch,
  };
}

export default useIsStaff;
