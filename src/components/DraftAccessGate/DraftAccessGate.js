import { Link } from 'react-router-dom';
import veclimLogo from 'assets/images/logos/VEClim-Icon.svg';
import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
import DraftAccessRequestPrompt from './DraftAccessRequestPrompt';
import TopAuthBar from 'components/TopAuthBar/TopAuthBar';
import './DraftAccessGate.css';

// blocks a draft vector page for anyone without access, in place instead of
// bouncing them home (that left the map nav pointed at the blocked vector
// and looped). caller already decided this is blocked - stays prop-driven,
// no useIsStaff() call here, since a mount/unmount cycle on the query
// subscription was what caused an infinite render loop before.
function DraftAccessGate({
  vector,
  isLoggedIn,
  username,
  pendingVectorIds,
  refetchIsStaff,
}) {
  if (!vector) return null;

  const label = vector.shortLabel || vector.label;

  return (
    <div className="draft-access-gate">
      {/* logged in but wrong account (e.g. two tabs) - let them switch without leaving */}
      {isLoggedIn && (
        <TopAuthBar username={username} refetchIsStaff={refetchIsStaff} />
      )}
      <img className="draft-access-logo" src={veclimLogo} alt="VEClim" />
      {!isLoggedIn ? (
        <LoginComponent
          requestAccessVectorId={vector.id}
          requestAccessLabel={label}
          refetchIsStaff={refetchIsStaff}
        />
      ) : (
        <DraftAccessRequestPrompt
          vectorId={vector.id}
          vectorLabel={label}
          pendingVectorIds={pendingVectorIds}
          refetchIsStaff={refetchIsStaff}
        />
      )}
      <Link to="/" className="draft-access-back">
        Back to home
      </Link>
    </div>
  );
}

export default DraftAccessGate;
