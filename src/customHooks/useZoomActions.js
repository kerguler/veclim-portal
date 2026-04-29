// useZoomActions.js
import { useEffect } from 'react';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { useDispatch, useSelector } from 'react-redux';
import useDirectorFun from './useDirectorFun';
import { setPermalink } from 'store';
import { getPermalinkFromMapRef } from 'utils/getPermalinkFromMapRef';
import { setCurrentMapZoom } from 'store';
import { setCurrentMapCenter } from 'store';
import { syncReduxFromLeaflet } from 'utils/syncReduxFromLeaflet';
import { getVector } from 'vectors/registry';
function useZoomActions(mapParRef) {
  const { vectorName, mapVector, lastPanelDisplayed, tileArray } =
    useDirectorFun('left');

  const mapPagePosition = useSelector(
    (state) => state.fetcher.fetcherStates.map.mapPagePosition
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const map = mapParRef?.current?.map;
    if (!map) return;

    const handleMarkers = () => {
      const p = mapParRef?.current;
      if (!p?.map) return;
      syncReduxFromLeaflet(mapParRef, dispatch);

      PackageMapServices.markerHandler(
        mapParRef,
        getVector(vectorName)?.map?.switchZoom ?? 4,
        mapVector,
        dispatch,
        mapPagePosition
      );

      dispatch(
        setPermalink(
          getPermalinkFromMapRef({
            mapParRef,
            vectorName,
            lastPanelDisplayed,
            tileArray,
          })
        )
      );
    };

    map.on('zoomend', handleMarkers);

    return () => {
      map.off('zoomend', handleMarkers);
    };
  }, [mapParRef, dispatch]);
}
export default useZoomActions;

// function useZoomActions(mapParRef) {
//   const { vectorName, mapVector, lastPanelDisplayed, tileArray } =
//     useDirectorFun('left');

//   const mapPagePosition = useSelector(
//     (state) => state.fetcher.fetcherStates.map.mapPagePosition
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const map = mapParRef?.current?.map;
//     if (!map) return;

//     const handleMarkers = () => {
//       const currentMap = mapParRef?.current?.map;
//       if (!currentMap) return;

//       PackageMapServices.markerHandler(
//         mapParRef,
//         4,
//         mapVector,
//         dispatch,
//         mapPagePosition
//       );

//       const permalink = getPermalinkFromMapRef({
//         mapParRef,
//         vectorName,
//         lastPanelDisplayed,
//         tileArray,
//       });

//       dispatch(setPermalink(permalink));
//     };

//     map.on('zoomend', handleMarkers);

//     // Only run initial marker positioning if map still exists
//     handleMarkers();

//     return () => {
//       map.off('zoomend', handleMarkers);
//     };
//   }, [
//     mapParRef,
//     mapVector,
//     mapPagePosition,
//     vectorName,
//     lastPanelDisplayed,
//     tileArray,
//     dispatch,
//   ]);
// }

// export default useZoomActions;
