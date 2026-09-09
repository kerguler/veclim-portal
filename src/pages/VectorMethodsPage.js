// src/pages/VectorMethodsPage.js
import './GenericPage/GenericPage.css';
import 'styles/Theme1.css';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getVector } from 'vectors/registry';
import { setVectorName } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import NavBarContainer from 'components/NavBar/NavBarContainer';
import LeftPanel from 'components/LeftPanel/LeftPanel';
import DesktopContentWrapper from './GenericPage/DesktopContentWrapper';
import { TextProvider } from 'context/appText';
import useIsStaff from 'customHooks/useIsStaff';
import DraftAccessGate from 'components/DraftAccessGate/DraftAccessGate';

function VectorMethodsPage() {
  const { vecId } = useParams(); // /Methods/:vecId
  const dispatch = useDispatch();
  const {
    isChecking: isStaffCheckPending,
    canView,
    isLoggedIn,
    username,
    pendingVectorIds,
    refetch: refetchIsStaff,
  } = useIsStaff();

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

    PackageMapServices.setActiveVector(dispatch, vecId);
    // // bootstrap vector from URL

    PackageMapServices.setActiveVector(dispatch, vecId);

 
  }, [vecId, dispatch, currentMapCenter, currentMapZoom, currentVectorName]);

  // Which vector's methods do we show?
  // Prefer Redux (selector), fall back to URL if Redux is still empty.
  const activeVectorId = currentVectorName || vecId;
  const vector = getVector(activeVectorId);

  // drafts show an access gate instead of the methods page
  const isDraftVector = vector?.status === 'draft';
  const draftAccessPending = isDraftVector && isStaffCheckPending;
  const draftAccessBlocked =
    isDraftVector && !isStaffCheckPending && !canView(vector?.id);

  if (!vector) {
    return <div>Unknown vector: {activeVectorId}</div>;
  }

  if (draftAccessBlocked) {
    return (
      <DraftAccessGate
        vector={vector}
        isLoggedIn={isLoggedIn}
        username={username}
        pendingVectorIds={pendingVectorIds}
        refetchIsStaff={refetchIsStaff}
      />
    );
  }

  if (draftAccessPending) {
    return null;
  }

  // Fallback to albopictus if no methodsPage
  let vectorToUse = vector;

  if (!vector.methodsPage) {
    const fallback = getVector('albopictus');

    if (!fallback?.methodsPage) {
      return <div>Albopictus methods page not found.</div>;
    }

    vectorToUse = fallback;
  }

  return (
    <TextProvider pageOverride={vectorToUse.methodsPage}>
      <>
        <NavBarContainer />
        <LeftPanel page="home" displayContent displayNews />
        <DesktopContentWrapper />
      </>
    </TextProvider>
  );
}

export default VectorMethodsPage;
