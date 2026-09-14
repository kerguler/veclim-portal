import { Link } from 'react-router-dom';
import veclimLogo from 'assets/images/logos/VEClim-Icon.svg';
import LoginComponent from 'pages/LoginRegister/LoginComponent/LoginComponent';
import DraftAccessRequestPrompt from './DraftAccessRequestPrompt';
import TopAuthBar from 'components/TopAuthBar/TopAuthBar';
import './DraftAccessGate.css';

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
