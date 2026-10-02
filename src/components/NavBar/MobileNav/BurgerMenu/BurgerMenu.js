import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import MethodsNavItem from 'components/MethodsNavItem/MethodsNavItem';
import VectorCarousel from 'components/vectorSelection/Carousel/VectorCarousel';
import AuthNav from 'components/AuthNav/AuthNav';
function BurgerMenu({ mainDivRef, linkText, handleMapBounds, handleMenu }) {
  const handleMenuClose = () => {
    handleMenu(false);
  };

  return (
    <div className="nav-burger">
      <div className=" links">
        <VectorCarousel className="burger-vector-carousel" />
        <Link onClick={handleMenuClose} to="/">
          HOME
        </Link>
        <Link onClick={handleMenuClose} to="/Project">
          PROJECT
        </Link>
        <Link onClick={handleMenuClose} to="/Policy">
          POLICY
        </Link>

        <MethodsNavItem />

        <a
          onClick={handleMenuClose}
          href="/tutorials-viewer/localfile/README.ipynb"
        >
          TUTORIALS
        </a>

        <div className="burger-bottom-row">
          <div className="burger-auth">
            <AuthNav />
          </div>

          <Link to={linkText} onClick={handleMapBounds} className="map">
            MAP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
