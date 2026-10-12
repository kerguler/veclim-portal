import { useRef, useState } from 'react';
import useIsStaff from 'customHooks/useIsStaff';
import useLogout from 'customHooks/useLogout';
import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
import CollaboratorAccessRequest from 'components/DraftAccessGate/CollaboratorAccessRequest';
import GrantedVectorsAccess from 'components/DraftAccessGate/GrantedVectorsAccess';
import './AccountPanel.css';

function AccountPanel() {
  const {
    isLoggedIn,
    isChecking,
    isStaff,
    username,
    grantedVectorIds,
    pendingVectorIds,
    refetch: refetchIsStaff,
  } = useIsStaff();
  const { handleLogout, loggingOut } = useLogout({ refetchIsStaff });
  const [authMode, setAuthMode] = useState('login');

  // block first check only, keeps form mounted
  const resolvedRef = useRef(false);
  if (!isChecking) resolvedRef.current = true;
  if (isChecking && !resolvedRef.current) return null;

  return (
    <div className="text-area account-panel">
      <h1>
        {!isLoggedIn && authMode === 'register' ? 'Registration' : 'My Account'}
      </h1>
      {isLoggedIn ? (
        <>
          <div className="account-panel__info">
            <span className="account-panel__username">{username}</span>
            <button
              type="button"
              className="account-panel__logout"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? 'Logging out…' : 'Log out'}
            </button>
          </div>
          <div className="account-panel__body">
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
        </>
      ) : (
        <LoginComponent
          refetchIsStaff={refetchIsStaff}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  );
}

export default AccountPanel;
