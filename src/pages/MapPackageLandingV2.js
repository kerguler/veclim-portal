import { React } from 'react';
import '../styles/MapPage.css';
import MapLogo from '../components/MapLogo/MapLogo';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import useMapStarter from 'customHooks/useMapStarter';
import MapPackageComponent from 'components/map/mapPackage/MapPackageComponent';
import { AlboDataProvider } from 'context/AlboDataContext';
import MapMenuPicker from 'components/mapMenu/mapMenuV2/MapMenuPicker';
import useFetcherStates from 'customHooks/fethcerStates/useFetcherStates';
import { setDirectInitError } from 'store';
import { useContext } from 'react';
import { PanelProviderV2 } from 'context/panelsIconsV2';

function MapPackageLanding() {
  useFetcherStates();
  // useMapStarter();

  const readyToView = useSelector((state) => state.fetcher.fetcherStates.readyToView);
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
          {/* <MapStarter /> */}
        </AlboDataProvider>
      </div>
    )
  );
}

export default MapPackageLanding;

const DirectInitError = ({ message }) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(10);
  const tileArray = useSelector((state) => state.fetcher.fetcherStates.tileArray);
  const errorInfo = useSelector((state) => state.mapMenu.left.directInitError);
  console.log('tileArray', { tileArray });
  useEffect(() => {
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter === 0) {
      dispatch(
        setDirectInitError({
          direction: 'left',
          value: { isError: false, message: '', type: '' },
        })
      );
    }
  }, [dispatch, counter]);
  let tileNames = tileArray.map((item) => {
    return item + '  ';
  });

  return (
    <div className="direct-init-error">
      <h1>There was an Error with your request : {errorInfo.type}</h1>
      <br />
      <h2>{message.heading}</h2> <br />
      <p>{message.explanation}</p>
      <br />
      You are being redirected to {tileNames},
      <br />
      <br />
      This message will self destruct if you dont... in {counter} seconds
    </div>
  );
};
