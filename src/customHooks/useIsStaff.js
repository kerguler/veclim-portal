import { useFetchCurrentUserQuery } from 'store';

// controls draft vector visibility everywhere. 401 from /me = not logged in, not an error
// RTK Query keeps old `data` after a failed refetch, so check `error` too or logout doesnt stick
//
// pass { skip: true } when a parent already has a stable subscription and
// handed you its refetch - a component whose own mount is conditional on
// isChecking (like the draft-access gate) must not open a second one, or
// mounting it flips isChecking, which unmounts it, which flips it back...
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
