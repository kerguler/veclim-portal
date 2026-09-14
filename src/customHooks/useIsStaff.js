import { useFetchCurrentUserQuery } from 'store';

// controls draft vector visibility everywhere. checks `error` too, not just
// `data` - RTK Query keeps stale data after a failed refetch, or logout
// doesnt stick. pass { skip: true } if a parent already has a subscription
// and handed you its refetch (a gated component opening its own would loop)
function useIsStaff({ skip = false } = {}) {
  const { data, error, isLoading, isUninitialized, refetch } =
    useFetchCurrentUserQuery(undefined, { skip });

  const loggedIn = Boolean(data) && !error;
  const grantedVectorIds = loggedIn ? data?.grantedDraftVectors || [] : [];
  const pendingVectorIds = loggedIn ? data?.pendingDraftVectors || [] : [];

  return {
    isStaff: loggedIn && Boolean(data?.isStaff),
    isLoggedIn: loggedIn,
    isChecking: isLoading || isUninitialized,
    username: loggedIn ? data?.username : null,
    grantedVectorIds,
    pendingVectorIds,
    canView: (vectorId) =>
      (loggedIn && Boolean(data?.isStaff)) || grantedVectorIds.includes(vectorId),
    refetch,
  };
}

export default useIsStaff;
