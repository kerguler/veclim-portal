import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogoutMutation, setApiRegisterResponse, setPassword } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import { getVector } from 'vectors/registry';

// Shared logout flow for every "Log out" button. Clears auth state and,
// on a draft vector, restarts on albopictus keeping the same page type.
function useLogout({ refetchIsStaff } = {}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mapVector = useSelector((state) => state.fetcher.fetcherStates.mapVector);
  const { refresh } = useCsrf();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

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
    const onMethods = location.pathname.startsWith('/Methods/');
    const currentId = onMethods
      ? location.pathname.split('/')[2]
      : new URLSearchParams(location.search).get('session') || mapVector;
    if (getVector(currentId)?.status === 'draft') {
      const fallback = getVector('albopictus');
      navigate(
        onMethods
          ? fallback?.meta?.methods?.route || '/Methods/albopictus'
          : fallback?.meta?.route || '/MapPage?session=albopictus'
      );
    }
  };

  return { handleLogout, loggingOut };
}

export default useLogout;
