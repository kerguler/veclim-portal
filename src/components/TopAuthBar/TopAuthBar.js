import { useDispatch } from 'react-redux';
import { useLogoutMutation, setApiRegisterResponse, setPassword } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import './TopAuthBar.css';

// username + logout chip so a collaborator can switch accounts here too
function TopAuthBar({ username, refetchIsStaff }) {
  const dispatch = useDispatch();
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
    refetchIsStaff();
  };

  return (
    <div className="top-auth-bar">
      <span className="top-auth-bar__user">{username || 'Signed in'}</span>
      <button
        type="button"
        className="top-auth-bar__logout"
        onClick={handleLogout}
        disabled={loggingOut}
        aria-label="Log out"
      >
        {loggingOut ? 'Logging out…' : 'Log out'}
      </button>
    </div>
  );
}

export default TopAuthBar;
