import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useIsStaff from 'customHooks/useIsStaff';
import useLogout from 'customHooks/useLogout';
import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
import CollaboratorAccessRequest from 'components/DraftAccessGate/CollaboratorAccessRequest';
import GrantedVectorsAccess from 'components/DraftAccessGate/GrantedVectorsAccess';
import userIcon from 'assets/icons/map-page-right-menu/svg/user-32px.svg';
import './AuthNav.css';

function AuthNav({ variant = 'default' }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const toggleRef = useRef();
  const popoverRef = useRef();

  const {
    isLoggedIn,
    isChecking,
    isStaff,
    username,
    grantedVectorIds,
    pendingVectorIds,
    refetch: refetchIsStaff,
  } = useIsStaff();
  const { handleLogout: runLogout, loggingOut } = useLogout({ refetchIsStaff });

  useLayoutEffect(() => {
    if (!open || !toggleRef.current) return;
    const rect = toggleRef.current.getBoundingClientRect();
    const popoverWidth = Math.min(300, window.innerWidth - 24);
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - popoverWidth / 2, 12),
      window.innerWidth - popoverWidth - 12
    );
    const opensUp = rect.top > window.innerHeight / 2;
    setCoords(
      opensUp
        ? { bottom: window.innerHeight - rect.top + 8, left }
        : { top: rect.bottom + 8, left }
    );
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
    await runLogout();
    setOpen(false);
  };

  if (isChecking) return null;

  const isIcon = variant === 'icon';

  return (
    <div className={isIcon ? 'auth-nav auth-nav--icon' : 'auth-nav'}>
      <button
        ref={toggleRef}
        type="button"
        className={
          isIcon ? 'auth-nav__toggle auth-nav__toggle--icon' : 'auth-nav__toggle'
        }
        aria-label={isLoggedIn ? username || 'Account' : 'Log in'}
        onClick={() => setOpen((v) => !v)}
      >
        {isIcon ? (
          <span
            className="auth-nav__icon-mask"
            style={{
              WebkitMaskImage: `url(${userIcon})`,
              maskImage: `url(${userIcon})`,
            }}
          />
        ) : isLoggedIn ? (
          username || 'Account'
        ) : (
          'Log in'
        )}
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            className="auth-nav__popover"
            ref={popoverRef}
            style={{ ...coords }}
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
                <GrantedVectorsAccess
                  isStaff={isStaff}
                  grantedVectorIds={grantedVectorIds}
                />
                {!isStaff && (
                  <CollaboratorAccessRequest
                    grantedVectorIds={grantedVectorIds}
                    pendingVectorIds={pendingVectorIds}
                    refetchIsStaff={refetchIsStaff}
                  />
                )}
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
