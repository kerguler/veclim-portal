import logo100 from 'assets/images/logos/VEClim-Logo.svg';
import './MyNavbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MethodsNavItem from 'components/MethodsNavItem/MethodsNavItem';
import { useEffect, useMemo } from 'react';
import { setReadyToView, setPanelOpen } from 'store';
import { getVector } from 'vectors/registry';
import useIsStaff from 'customHooks/useIsStaff';

function MyNavbar({ style }) {
  const panelInterfere = useSelector(
    (state) => state.mapMenu.left.panel.panelInterfere
  );
  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );
  const mapVector = useSelector(
    (state) => state.fetcher.fetcherStates.mapVector
  );
  const { canView } = useIsStaff();

  const dispatch = useDispatch();

  // decide which vector to use for map routing, skip a draft this visitor
  // cant see so the nav link doesnt just send them back into the gate
  const currentVectorId = useMemo(() => {
    const candidate = mapVector || vectorName || 'albopictus';
    const vec = getVector(candidate);
    if (vec?.status === 'draft' && !canView(vec.id)) return 'albopictus';
    return candidate;
  }, [mapVector, vectorName, canView]);

  const currentVector = getVector(currentVectorId);
  const mapRoute = currentVector?.meta?.route || '/MapPage';

  const handleMapBounds = () => {
    // Apply vector-specific bounds/center/etc before going to map.
    // Loaded on demand since PackageMapServices pulls in Leaflet, which
    // shouldn't be part of every page's initial bundle.
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
  };



  return (
    <div className="navbar">
      <div className="my-navbar">
        <Link to="/">
          <div className="logo-div">
            <img src={logo100} alt="VEClim Logo" />
          </div>
        </Link>

        <div className="navbar-links">
          <Link to="/">HOME</Link>
          <Link to="/Project">PROJECT</Link>
          <Link to="/Policy">POLICY</Link>
          <MethodsNavItem />
          <a href="/tutorials-viewer/localfile/README.ipynb">TUTORIALS</a>

          {/* 🔑 Vector-dependent MAP link */}
          <Link onClick={handleMapBounds} className="button" to={mapRoute}>
            MAP &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyNavbar;
