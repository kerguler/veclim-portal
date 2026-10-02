import useLogout from 'customHooks/useLogout';
import './TopAuthBar.css';

// username + logout chip so a collaborator can switch accounts here too
function TopAuthBar({ username, refetchIsStaff }) {
  const { handleLogout, loggingOut } = useLogout({ refetchIsStaff });

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
