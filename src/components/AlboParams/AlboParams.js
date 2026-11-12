import './alboParams.css';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';

import { useGetSimulationListQuery } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import useIsStaff from 'customHooks/useIsStaff';

function AlboParams({ children }) {
  const { refresh } = useCsrf();
  const { isLoggedIn, isChecking } = useIsStaff();

  const apiReg = useSelector((s) => s.login.apiRegisterResponse);
  const userID = apiReg?.userId;

  // No local record of being logged in yet (e.g. fresh page load) - probe
  // with an already-authenticated endpoint to see if the existing session
  // cookie is still valid, instead of asking for the password again.
  const {
    data: sessionCheckData,
    error: sessionCheckError,
    isFetching: checkingSession,
  } = useGetSimulationListQuery(
    { return_results: false },
    { skip: Boolean(userID) }
  );

  const hasValidSession =
    Boolean(userID) ||
    (Boolean(sessionCheckData) &&
      !sessionCheckError &&
      (isChecking || isLoggedIn));

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

  if (!hasValidSession && checkingSession) {
    return <div className="albo-params-container">Checking session…</div>;
  }

  return hasValidSession ? (
    <div className="albo-params-container">{children}</div>
  ) : (
    <div className="albo-params-container">
      <LoginComponent />
    </div>
  );
}

export default AlboParams;
