import { Link } from 'react-router-dom';
import veclimLogo from 'assets/images/logos/VEClim-Icon.svg';
import './NoPage.css';

function NoPage() {
  return (
    <div className="no-page">
      <img className="no-page-logo" src={veclimLogo} alt="VEClim" />
      <div className="no-page-card">
        <p className="no-page-code">404</p>
        <h2>Page not found</h2>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <div className="no-page-actions">
          <Link to="/" className="no-page-btn">
            Home
          </Link>
          <Link
            to="/MapPage?session=albopictus"
            className="no-page-btn no-page-btn--alt"
          >
            Open the map
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
