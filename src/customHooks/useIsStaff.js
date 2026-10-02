import { useFetchCurrentUserQuery } from 'store';


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
