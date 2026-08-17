import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import MethodsNavItem from 'components/MethodsNavItem/MethodsNavItem';
import VectorCarousel from 'components/vectorSelection/Carousel/VectorCarousel';
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

        <Link to={linkText} onClick={handleMapBounds} className="map">
          MAP
        </Link>
      </div>
    </div>
  );
}

export default BurgerMenu;
