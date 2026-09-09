import './mobileNav.css';
import overlayImage from 'assets/images/dark_background_overlay_complete.webp';
import worldPic from 'assets/icons/009-globe-4-32px.png';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'styles/IconMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClickClose from 'customHooks/useOutsideClickClose';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import { getVector } from 'vectors/registry';
import { setReadyToView, setPanelOpen } from 'store';
import useIsStaff from 'customHooks/useIsStaff';

function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainDivRef = useRef();
  useOutsideClickClose(mainDivRef, setIsMenuOpen);

  const dispatch = useDispatch();

  // ✅ match MyNavbar selectors
  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );
  const mapVector = useSelector(
    (state) => state.fetcher.fetcherStates.mapVector
  );

  const { canView } = useIsStaff();

  // ✅ same decision rule as MyNavbar, skips a draft this visitor cant see
  const currentVectorId = useMemo(() => {
    const candidate = mapVector || vectorName || 'albopictus';
    const vec = getVector(candidate);
    if (vec?.status === 'draft' && !canView(vec.id)) return 'albopictus';
    return candidate;
  }, [mapVector, vectorName, canView]);

  // ✅ same route derivation as MyNavbar
  const currentVector = getVector(currentVectorId);
  const mapRoute = currentVector?.meta?.route || '/MapPage';

  const handleClick = () => setIsMenuOpen((v) => !v);

  // PackageMapServices pulls in Leaflet, so it's loaded on demand rather
  // than imported at the top of this module (rendered on every page).
  const handleMapBounds = () => {
    import('components/map/mapPackage/PackageMapServices').then(
      ({ default: PackageMapServices }) => {
        PackageMapServices.handleToMapPageTransition(
          dispatch,
          currentVectorId,
          currentVectorId
        );
      }
    );
    dispatch(setPanelOpen({ direction: 'left', value: false }));
    dispatch(setReadyToView(false));
    setIsMenuOpen(false); // optional: close burger after navigation
  };

  // ✅ optional sync behavior (same as MyNavbar)
  useEffect(() => {
    if (!mapVector) return;
    import('components/map/mapPackage/PackageMapServices').then(
      ({ default: PackageMapServices }) => {
        PackageMapServices.handleToMapPageTransition(
          dispatch,
          mapVector,
          mapVector
        );
      }
    );
  }, [mapVector, dispatch]);

  return (
    <div className="navbar mobile">
      <div ref={mainDivRef} className="cover">
        {isMenuOpen && (
          <BurgerMenu
            handleMenu={handleClick}
            mainDivRef={mainDivRef}
            linkText={mapRoute} // ✅ now dynamic like MyNavbar
            handleMapBounds={handleMapBounds}
          />
        )}

        <div className="overlay-pic">
          <img alt="overlay" src={overlayImage} />
        </div>

        <Link onClick={handleMapBounds} to={mapRoute} className="map">
          <div className="map-page-icon">
            <img className="map-icon" alt="map-icon" src={worldPic} />
          </div>
        </Link>

        <header className="mobile-header">
          <div className="burger-menu">
            <div onClick={handleClick} width="32px" className="burger-icon" />
          </div>
        </header>
      </div>
    </div>
  );
}

export default MobileNav;
