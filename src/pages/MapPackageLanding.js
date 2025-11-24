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

// const DirectInitError = ({ message }) => {
//   const dispatch = useDispatch();
//   const [counter, setCounter] = useState(10);
//   const tileArray = useSelector(
//     (state) => state.fetcher.fetcherStates.tileArray
//   );
//   const errorInfo = useSelector((state) => state.mapMenu.left.directInitError);
//   console.log('tileArray', { tileArray });
//   useEffect(() => {
//     setTimeout(() => {
//       setCounter(counter - 1);
//     }, 1000);
//     if (counter === 0) {
//       dispatch(
//         setDirectInitError({
//           direction: 'left',
//           value: { isError: false, message: '', type: '' },
//         })
//       );
//     }
//   }, [dispatch, counter]);
//   let tileNames = tileArray.map((item) => {
//     return item + '  ';
//   });

//   return (
//     <div className="direct-init-error">
//       <h1>There was an Error with your request : {errorInfo.type}</h1>
//       <br />
//       <h2>{message.heading}</h2> <br />
//       <p>{message.explanation}</p>
//       <br />
//       You are being redirected to {tileNames},
//       <br />
//       <br />
//       This message will self destruct if you dont... in {counter} seconds
//     </div>
//   );
// };
