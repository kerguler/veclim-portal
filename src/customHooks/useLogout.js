import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation, setApiRegisterResponse, setPassword } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import { getVector } from 'vectors/registry';

// Shared logout flow for every "Log out" button. Clears auth state and,
// if viewing a now-inaccessible draft vector, redirects to the default one.
function useLogout({ refetchIsStaff } = {}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refresh } = useCsrf();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  const mapVector = useSelector((state) => state.fetcher.fetcherStates.mapVector);
  const vectorName = useSelector((state) => state.fetcher.fetcherStates.vectorName);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (e) {
      console.error('Logout failed (continuing cleanup):', e);
    }
    dispatch(
      setApiRegisterResponse({
        response: null,
        status: null,
        message: null,
        userName: null,
        userId: null,
      })
    );
    dispatch(setPassword(''));
    localStorage.removeItem('id');
    try {
      await refresh();
    } catch (e) {
      console.error('CSRF refresh after logout failed (non-critical):', e);
    }
    try {
      refetchIsStaff?.();
    } catch (e) {
      // can throw if the query was unsubscribed mid-logout; non-critical
      console.error('refetchIsStaff after logout failed (non-critical):', e);
    }

    // ?session=<id> stays in the URL through logout, so redirect away
    // from a draft vector we can no longer view
    const currentId = mapVector || vectorName;
    const currentVector = currentId ? getVector(currentId) : null;
    if (currentVector?.status === 'draft') {
      const fallback = getVector('albopictus');
      navigate(fallback?.meta?.route || '/MapPage?session=albopictus');
    }
  };

  return { handleLogout, loggingOut };
}

export default useLogout;
