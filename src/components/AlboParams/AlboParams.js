import './alboParams.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';

import { useLogoutMutation, useGetSimulationListQuery } from 'store';
import { setApiRegisterResponse, setPassword } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';

function AlboParams({ children }) {
  const dispatch = useDispatch();
  const { refresh } = useCsrf();

  const direction = 'left';
  const apiReg = useSelector((s) => s.login.apiRegisterResponse);
  const userID = apiReg?.userId;
  const userName = apiReg?.userName || localStorage.getItem('username');

  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  // No local record of being logged in yet (e.g. fresh page load) - probe
  // with an already-authenticated endpoint to see if the existing session
  // cookie is still valid, instead of asking for the password again.
  const {
    data: sessionCheckData,
    error: sessionCheckError,
    isFetching: checkingSession,
    refetch: refetchSessionCheck,
  } = useGetSimulationListQuery(
    { return_results: false },
    { skip: Boolean(userID) }
  );

  const hasValidSession =
    Boolean(userID) || (Boolean(sessionCheckData) && !sessionCheckError);

  // A session can become valid either via a fresh login (which already
  // refreshes the CSRF token itself) or via this passive cookie check on
  // page load. Only the login path used to refresh CSRF, so a returning
  // user with a still-valid session cookie never got a matching CSRF
  // token in Redux, and every mutation fell back to sending the raw
  // cookie value - which the backend rejects. Refresh here too.
  const csrfRefreshedRef = useRef(false);
  useEffect(() => {
    if (hasValidSession && !csrfRefreshedRef.current) {
      csrfRefreshedRef.current = true;
      refresh().catch((e) => {
        console.error('CSRF refresh on session validation failed:', e);
        csrfRefreshedRef.current = false;
      });
    }
    if (!hasValidSession) {
      csrfRefreshedRef.current = false;
    }
  }, [hasValidSession, refresh]);

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // server clears session cookie
    } catch (e) {
      console.error('Logout failed (continuing cleanup):', e);
    }
    // local cleanup
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
    // Force the session-check query to re-run now that the cookie is gone,
    // otherwise its cached "logged in" result keeps the panel showing.
    refetchSessionCheck();
  };

  if (!hasValidSession && checkingSession) {
    return <div className="albo-params-container">Checking session…</div>;
  }

  return hasValidSession ? (
    <div className="albo-params-container">
      <div className="albo-header">
        <span className="albo-user">
          {userName ? `Signed in as ${userName}` : 'Signed in'}
        </span>
        <button
          type="button"
          className="link-btn logout"
          onClick={handleLogout}
          disabled={loggingOut}
          aria-label="Log out"
        >
          {loggingOut ? 'Logging out…' : 'Log out'}
        </button>
      </div>
      {children}
    </div>
  ) : (
    <div className="albo-params-container">
      <LoginComponent />
    </div>
  );
}

export default AlboParams;
