import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation, setApiRegisterResponse, setPassword } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import useIsStaff from 'customHooks/useIsStaff';
import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
import './AuthNav.css';

function AuthNav() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const toggleRef = useRef();
  const popoverRef = useRef();

  const dispatch = useDispatch();
  const { refresh } = useCsrf();
  const {
    isLoggedIn,
    isChecking,
    username,
    refetch: refetchIsStaff,
  } = useIsStaff();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  useLayoutEffect(() => {
    if (!open || !toggleRef.current) return;
    const rect = toggleRef.current.getBoundingClientRect();
    // opens rightward - anchoring to rect.right ran it off-screen
    setCoords({ top: rect.bottom + 8, left: rect.left });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (toggleRef.current?.contains(e.target)) return;
      if (popoverRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, [open]);

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
    refetchIsStaff();
    setOpen(false);
  };

  if (isChecking) return null;

  return (
    <div className="auth-nav">
      <button
        ref={toggleRef}
        type="button"
        className="auth-nav__toggle"
        onClick={() => setOpen((v) => !v)}
      >
        {isLoggedIn ? username || 'Account' : 'Log in'}
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            className="auth-nav__popover"
            ref={popoverRef}
            style={{ top: coords.top, left: coords.left }}
          >
            {isLoggedIn ? (
              <div className="auth-nav__account">
                <span className="auth-nav__username">{username}</span>
                <button
                  type="button"
                  className="auth-nav__logout"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? 'Logging out…' : 'Log out'}
                </button>
              </div>
            ) : (
              <LoginComponent
                refetchIsStaff={refetchIsStaff}
                onSuccess={() => setOpen(false)}
              />
            )}
          </div>,
          document.body
        )}
    </div>
  );
}

export default AuthNav;
