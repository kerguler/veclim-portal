import { React } from 'react';
import '../styles/MapPage.css';
import MapLogo from '../components/MapLogo/MapLogo';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import MapPackageComponent from 'components/map/mapPackage/MapPackageComponent';
import { AlboDataProvider } from 'context/AlboDataContext';
import MapMenuPicker from 'components/mapMenu/mapMenu/MapMenuPicker';
import useFetcherStates from 'customHooks/fethcerStates/useFetcherStates';
import DraftAccessGate from 'components/DraftAccessGate/DraftAccessGate';
import TopAuthBar from 'components/TopAuthBar/TopAuthBar';
function MapPackageLanding() {
  const {
    activeVector,
    draftAccessPending,
    draftAccessBlocked,
    isLoggedIn,
    username,
    pendingVectorIds,
    refetchIsStaff,
  } = useFetcherStates();
  const readyToView = useSelector(
    (state) => state.fetcher.fetcherStates.readyToView
  );

  if (draftAccessBlocked) {
    return (
      <DraftAccessGate
        vector={activeVector}
        isLoggedIn={isLoggedIn}
        username={username}
        pendingVectorIds={pendingVectorIds}
        refetchIsStaff={refetchIsStaff}
      />
    );
  }

  if (draftAccessPending) return null;

  return (
    readyToView && (
      <div className="wrappers-wrapper">
        <AlboDataProvider>
          <div className="map-wrapper">
            <MapLogo />
            {/* lets a collaborator who logged in via a draft link switch accounts here too */}
            {isLoggedIn && (
              <TopAuthBar username={username} refetchIsStaff={refetchIsStaff} />
            )}
            <MapMenuPicker direction="left" />
            <ErrorBoundary>
              <MapPackageComponent />
            </ErrorBoundary>
          </div>
        </AlboDataProvider>
      </div>
    )
  );
}

export default MapPackageLanding;
