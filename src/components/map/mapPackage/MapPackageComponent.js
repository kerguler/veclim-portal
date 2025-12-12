import { useEffect } from 'react';
import '../MapComponent/mapComponent.css';
import MapCircularProgressBar from '../MapCircularProgessBar/MapCircularProgressBar';
import { useRef } from 'react';
import PackageMapServices from './PackageMapServices';
import useLMapCoordinateUpdate from 'customHooks/MapPackage/useLMapCoordinateUpdate';
import ErrorScreenMap from '../errorScreen/ErrorScreenMap';
import useLMap from 'customHooks/MapPackage/useLMap';
import { useDispatch } from 'react-redux';
import useTileHandler from 'customHooks/MapPackage/useTileHandler';
import useSeparatorActions from 'customHooks/MapPackage/useSeparatorActions';
import useZoomActions from 'customHooks/useZoomActions';
import useMapBasicEvents from 'customHooks/MapPackage/useMapBasicEvents';
import useLMapResize from 'customHooks/MapPackage/useLMapResize';
import { useSelector } from 'react-redux';
import useDirectorFun from 'customHooks/useDirectorFun';
import ColorBarLabelComponent from '../ColorBarLabel/ColorBarLabelComponent';
import { useState } from 'react';
import MapContextMenu from '../mapContextMenu/MapContextMenu';
import useMapPermalinkSync from 'customHooks/permalink/usePermalinkSync';
function MapPackageComponent({ fitworld }) {
  const dispatch = useDispatch();
  const {
    currentMapBounds,
    currentMaxBounds,
    currentMapZoom,
    mapPagePosition,
    currentMapCenter,
    directMap,
    switchMap,
    optionsPanel,
    directInitError,
    mapVector,
    vectorName,
    lastPanelDisplayed,
    isPermalinkClick,
  } = useDirectorFun('left');
  const tileArray = useSelector(
    (state) => state.fetcher.fetcherStates.tileArray
  );
  const mapParameters = {
    map: null,
    center: currentMapCenter,
    zoom: currentMapZoom,
    maxBounds: currentMaxBounds,
    bounds: currentMapBounds,
    highlightMarker: null,
    rectMarker: null,
    iconMarker: null,
    prevClickPointRef: null,
    minZoom: 1,
    tiles: null,
    tileMat: [],
    sideBySide: null,
  };

  const mapParRef = useRef(mapParameters);
  let p = mapParRef.current;
  const [ctxMenu, setCtxMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    permalink: '',
  });
  useLMap(mapParRef);

  useMapPermalinkSync({
    mapParRef,
    vectorName,
    mapPagePosition,
    lastPanelDisplayed,
    tileArray,
    isPermalinkClick,
  });
  useLMapCoordinateUpdate(mapParRef);
  useTileHandler(mapParRef);
  useSeparatorActions(mapParRef);
  useZoomActions(mapParRef);
  useMapBasicEvents(mapParRef, fitworld, ({ containerPoint, permalink }) => {
    setCtxMenu({
      visible: true,
      x: containerPoint.x,
      y: containerPoint.y,
    });
  });

  const closeContextMenu = () => setCtxMenu((s) => ({ ...s, visible: false }));

  useLMapResize(mapParRef);

  useEffect(() => {
    if (
      (mapPagePosition &&
        directMap.display !== -2 &&
        directMap.display !== null) ||
      (directMap.display !== -2 && directMap.display !== null)
    ) {
      let e = {
        latlng: {
          lat: directMap.lat,
          lng: directMap.lon,
        },
      };

      PackageMapServices.handleMapClick(
        e,
        mapParRef,
        mapVector,
        dispatch,
        directMap,

        mapPagePosition,
        'left'
      );
    }

    return () => {};
  }, [directMap, dispatch, mapVector, tileArray, mapPagePosition, switchMap]);

  return (
    <>
      {directInitError.isError && <ErrorScreenMap />} <MapCircularProgressBar />
      {/* <ColorBarComponent times={tileArray?.length}></ColorBarComponent> */}
      <ColorBarLabelComponent times={tileArray.length}></ColorBarLabelComponent>
      {/* <TileNameDisplay></TileNameDisplay> */}
      <div className="map" id="map1">
        <div id="coordinates"></div>
        {ctxMenu.visible && (
          <MapContextMenu
            x={ctxMenu.x}
            y={ctxMenu.y}
            permalink={ctxMenu.permalink}
            onClose={closeContextMenu}
          />
        )}
      </div>
    </>
  );
}

export default MapPackageComponent;
