import './loginComponent.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsername,
  setPassword,
  setRememberLogin,
} from 'store/slices/loginSlice';
import {
  useLoginMutation,
  useRegisterMutation,
  useRequestDraftAccessMutation,
} from 'store';
import { setApiRegisterResponse } from 'store';
import useCsrf from '../Services/useCsrf';
import useIsStaff from 'customHooks/useIsStaff';

// turns an RTK Query error into a short, human-readable message
function getFriendlyAuthError(err, mode) {
  if (!err) return null;

  if (err.status === 'FETCH_ERROR' || err.status === 'TIMEOUT_ERROR') {
    return "Can't reach the server right now. Check your connection and try again in a moment.";
  }
  if (err.status === 'PARSING_ERROR') {
    return 'The server sent back an unexpected response. Please try again.';
  }

  const data = err.data;
  const fromBody =
    (typeof data === 'string' && data) ||
    data?.detail ||
    data?.error ||
    data?.message ||
    (Array.isArray(data?.non_field_errors) && data.non_field_errors[0]) ||
    (Array.isArray(data?.username) && data.username[0]) ||
    (Array.isArray(data?.password) && data.password[0]);

  if (fromBody && typeof fromBody === 'string') return fromBody;

  if (typeof err.status === 'number') {
    if (err.status === 401 || err.status === 400 || err.status === 403) {
      return mode === 'register'
        ? "Couldn't create your account. Please check your details and try again."
        : 'Incorrect username or password.';
    }
    if (err.status === 404) {
      return 'Login service is unavailable right now. Please try again later.';
    }
    if (err.status === 429) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    if (err.status >= 500) {
      return 'The server ran into a problem. Please try again shortly.';
    }
  }

  return 'Something went wrong. Please try again.';
}

function LoginComponent({
  requestAccessVectorId,
  requestAccessLabel,
  refetchIsStaff: refetchIsStaffProp,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const { refresh } = useCsrf();

  const username = useSelector((s) => s.login.username);
  const password = useSelector((s) => s.login.password);
  const rememberLogin = useSelector((s) => s.login.rememberLogin);

  const [login, { isLoading: loggingIn, error: loginErr }] = useLoginMutation();
  const [register, { isLoading: registering, error: registerErr }] =
    useRegisterMutation();
  const [requestDraftAccess] = useRequestDraftAccessMutation();
  // skip our own subscription if the caller already has one (draft-access gate does)
  const { refetch: refetchIsStaffOwn } = useIsStaff({
    skip: Boolean(refetchIsStaffProp),
  });
  const refetchIsStaff = refetchIsStaffProp || refetchIsStaffOwn;

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [confirm, setConfirm] = useState('');
  const [requestAccessChecked, setRequestAccessChecked] = useState(true);

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem('rememberLogin') === 'true';
    const storedUser = localStorage.getItem('username') || '';
    if (remembered) {
      dispatch(setRememberLogin(true));
      if (storedUser) dispatch(setUsername(storedUser));
    }
  }, [dispatch]);

  const onUsername = (e) => dispatch(setUsername(e.target.value));
  const onPassword = (e) => dispatch(setPassword(e.target.value));
  const onConfirm = (e) => setConfirm(e.target.value);

  const onRemember = (e) => {
    const val = e.target.checked;
    dispatch(setRememberLogin(val));
    localStorage.setItem('rememberLogin', String(val));
    if (val) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        username,
        password,
        remember: rememberLogin,
      }).unwrap();
      dispatch(
        setApiRegisterResponse({
          response: data,
          status: data?.status,
          message: data?.message,
          userName: username,
          userId: data?.userId,
        })
      );
      if (rememberLogin) localStorage.setItem('username', username);
      await refresh(); // now triggers the lazy query; no more refetch error
      refetchIsStaff(); // same thing as logout, just in reverse

      if (requestAccessVectorId && requestAccessChecked) {
        requestDraftAccess(requestAccessVectorId);
      }
      onSuccess?.();
    } catch (err) {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) return;
    const res = await register({ username, password });
    if ('data' in res) {
      await handleLogin(e);
    }
  };

  const submitting = loggingIn || registering;
  const activeErr = mode === 'login' ? loginErr : registerErr;
  const errorMessage = activeErr ? getFriendlyAuthError(activeErr, mode) : null;

  return (
    <div className="login-base">
      <div className="login-card">
        <p className="login-sub">
          {requestAccessVectorId
            ? `Log in or create an account to request access to ${requestAccessLabel || requestAccessVectorId}`
            : 'You must be logged in to run parameters'}
        </p>

        <form
          onSubmit={mode === 'login' ? handleLogin : handleRegister}
          className="login-form"
          noValidate
        >
          <label className="visually-hidden" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="text-field"
            placeholder="username"
            autoComplete="username"
            value={username}
            onChange={onUsername}
            required
          />

          <label className="visually-hidden" htmlFor="password">
            Password
          </label>
          <div className="input-wrap">
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              className="text-field"
              placeholder="password"
              autoComplete={
                mode === 'login' ? 'current-password' : 'new-password'
              }
              value={password}
              onChange={onPassword}
              required
            />
            <button
              type="button"
              className="pw-toggle"
              aria-pressed={showPw}
              aria-controls="password"
              onClick={() => setShowPw((v) => !v)}
              title={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>

          {mode === 'register' && (
            <>
              <label className="visually-hidden" htmlFor="confirm">
                Confirm password
              </label>
              <div className="input-wrap">
                <input
                  id="confirm"
                  type={showConfirmPw ? 'text' : 'password'}
                  className="text-field"
                  placeholder="confirm password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={onConfirm}
                  required
                />
                <button
                  type="button"
                  className="pw-toggle"
                  aria-pressed={showConfirmPw}
                  aria-controls="confirm"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  title={showConfirmPw ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPw ? 'Hide' : 'Show'}
                </button>
              </div>
            </>
          )}

          {requestAccessVectorId && (
            <label className="checkbox">
              <input
                type="checkbox"
                checked={requestAccessChecked}
                onChange={(e) => setRequestAccessChecked(e.target.checked)}
              />
              <span>Request collaborator access to this model</span>
            </label>
          )}

          <div className="form-row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberLogin}
                onChange={onRemember}
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="primary-btn"
              disabled={
                submitting || (mode === 'register' && password !== confirm)
              }
            >
              {mode === 'login'
                ? loggingIn
                  ? 'Logging in…'
                  : 'Login'
                : registering
                  ? 'Registering…'
                  : 'Register'}
            </button>
          </div>

          {mode === 'register' && password !== confirm && (
            <div className="error small">Passwords don’t match.</div>
          )}
          {errorMessage && (
            <div className="error" role="alert" aria-live="polite">
              <span className="error-icon" aria-hidden="true">
                !
              </span>
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        <div className="form-footer">
          {mode === 'login' ? (
            <span>
              Don’t have an account?{' '}
              <button
                className="link-btn"
                onClick={() => setMode('register')}
                type="button"
              >
                Create one
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                className="link-btn"
                onClick={() => setMode('login')}
                type="button"
              >
                Log in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
