import logo100 from 'assets/images/logos/VEClim-Logo.svg';
import './MyNavbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MethodsNavItem from 'components/MethodsNavItem/MethodsNavItem';
import { useEffect, useMemo } from 'react';
import { setReadyToView, setPanelOpen } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { getVector } from 'vectors/registry';

function MyNavbar({ style }) {
  const panelInterfere = useSelector(
    (state) => state.mapMenu.left.panel.panelInterfere
  );
  const openItems = useSelector((state) => state.mapMenu.left.openItems);

  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );
  const mapVector = useSelector(
    (state) => state.fetcher.fetcherStates.mapVector
  );

  const dispatch = useDispatch();

  // Decide which vector to use for map routing (prefer mapVector, fall back to vectorName)
  const currentVectorId = useMemo(
    () => mapVector || vectorName || 'albopictus',
    [mapVector, vectorName]
  );

  const currentVector = getVector(currentVectorId);
  const mapRoute = currentVector?.meta?.route || '/MapPage';

  const handleMapBounds = () => {
    // Apply vector-specific bounds/center/etc before going to map
    PackageMapServices.handleToMapPageTransition(
      dispatch,
      currentVectorId,
      currentVectorId
    );
    dispatch(setPanelOpen({ direction: 'left', value: false }));
    dispatch(setReadyToView(false));
  };

  // Optional: keep bounds in sync when mapVector changes
  useEffect(() => {
    if (!mapVector) return;
    PackageMapServices.handleToMapPageTransition(
      dispatch,
      mapVector,
      mapVector
    );
  }, [mapVector, dispatch]);

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
