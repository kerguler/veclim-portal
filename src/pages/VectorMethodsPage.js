// src/pages/VectorMethodsPage.js
import './GenericPage/GenericPage.css';
import 'styles/Theme1.css';

import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getVector } from 'vectors/registry';
import { setMapVector, setVectorName } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import NavBarContainer from 'components/NavBar/NavBarContainer';
import LeftPanel from 'components/LeftPanel/LeftPanel';
import DesktopContentWrapper from './GenericPage/DesktopContentWrapper';
import { TextProvider } from 'context/appText';

function VectorMethodsPage() {
  const { vecId } = useParams(); // /Methods/:vecId
  const dispatch = useDispatch();

  const currentVectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );
  const currentMapCenter = useSelector(
    (state) => state.fetcher.fetcherStates.map.currentMapCenter
  );

  const currentMapZoom = useSelector(
    (state) => state.fetcher.fetcherStates.map.currentMapZoom
  );
  // Run URL → Redux sync only once per mount

  useEffect(() => {
    if (!vecId) return;

    // bootstrap vector from URL
    PackageMapServices.handleMapSwitch(
      dispatch,
      currentVectorName,
      vecId,
      currentMapCenter,
      currentMapZoom
    );
  }, [vecId, dispatch, currentMapCenter, currentMapZoom, currentVectorName]);

  // Which vector's methods do we show?
  // Prefer Redux (selector), fall back to URL if Redux is still empty.
  const activeVectorId = currentVectorName || vecId;
  const vector = getVector(activeVectorId);

  if (!vector) {
    return <div>Unknown vector: {activeVectorId}</div>;
  }

  if (!vector.methodsPage) {
    return (
      <div>
        No methods page defined for{' '}
        {vector.meta?.methods?.label || activeVectorId}
      </div>
    );
  }

  return (
    <TextProvider pageOverride={vector.methodsPage}>
      <>
        <NavBarContainer />
        {/* LeftPanel uses vectorName from Redux; selector drives everything */}
        <LeftPanel page="home" displayContent displayNews />
        <DesktopContentWrapper />
      </>
    </TextProvider>
  );
}

export default VectorMethodsPage;
