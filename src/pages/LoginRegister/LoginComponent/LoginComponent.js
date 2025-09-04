import './loginComponent.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsername,
  setPassword,
  setRememberLogin,
} from 'store/slices/loginSlice';
import { useLoginMutation, useRegisterMutation } from 'store';
import { setApiRegisterResponse } from 'store';
import useCsrf from '../Services/useCsrf';

function LoginComponent() {
  const dispatch = useDispatch();
  const { refresh } = useCsrf();

  const username = useSelector((s) => s.login.username);
  const password = useSelector((s) => s.login.password);
  const rememberLogin = useSelector((s) => s.login.rememberLogin);

  const [login, { isLoading: loggingIn, error: loginErr }] = useLoginMutation();
  const [register, { isLoading: registering, error: registerErr }] =
    useRegisterMutation();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [confirm, setConfirm] = useState('');

  // NEW: show/hide toggles
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem('rememberLogin') === 'true';
    const storedUser = localStorage.getItem('username') || '';
    const storedPw = localStorage.getItem('password') || '';
    if (remembered) {
      dispatch(setRememberLogin(true));
      if (storedUser) dispatch(setUsername(storedUser));
      if (storedPw) dispatch(setPassword(storedPw));
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
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login({ username, password });
    if ('data' in res) {
      dispatch(
        setApiRegisterResponse({
          response: res.data,
          status: res.data?.status,
          message: res.data?.message,
          userName: username,
          userId: res.data?.userId,
        })
      );
      if (rememberLogin) localStorage.setItem('username', username);
      await refresh();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) return;
    const res = await register({ username, password });
    if ('data' in res) {
      await handleLogin(e); // optional auto-login
    }
  };

  const submitting = loggingIn || registering;
  const showError =
    (loginErr && mode === 'login') || (registerErr && mode === 'register');

  return (
    <div className="login-base">
      <div className="login-card">
        <h2 className="login-title">Simulation Data</h2>
        <p className="login-sub">You must be logged in to run parameters</p>

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
          {showError && (
            <div className="error" aria-live="polite">
              {('error' in (mode === 'login' ? loginErr : registerErr) &&
                (mode === 'login' ? loginErr : registerErr)?.error) ||
                'Something went wrong.'}
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
