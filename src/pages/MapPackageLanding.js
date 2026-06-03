import { React } from 'react';
import '../styles/MapPage.css';
import MapLogo from '../components/MapLogo/MapLogo';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import MapPackageComponent from 'components/map/mapPackage/MapPackageComponent';
import { AlboDataProvider } from 'context/AlboDataContext';
import MapMenuPicker from 'components/mapMenu/mapMenu/MapMenuPicker';
import useFetcherStates from 'customHooks/fethcerStates/useFetcherStates';
function MapPackageLanding() {
  useFetcherStates();
  const readyToView = useSelector(
    (state) => state.fetcher.fetcherStates.readyToView
  );
  return (
    readyToView && (
      <div className="wrappers-wrapper">
        <AlboDataProvider>
          <div className="map-wrapper">
            <MapLogo />
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
