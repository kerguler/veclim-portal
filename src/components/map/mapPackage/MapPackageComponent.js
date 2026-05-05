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
import useDirectorFun from 'customHooks/useDirectorFun';
import ColorBarLabelComponent from '../ColorBarLabel/ColorBarLabelComponent';
import { useState } from 'react';
import MapContextMenu from '../mapContextMenu/MapContextMenu';
import useMapPermalinkSync from 'customHooks/permalink/usePermalinkSync';
import { setDirectMap } from 'store';
import { setPersistPointer } from 'store';
import { syncReduxFromLeaflet } from 'utils/syncReduxFromLeaflet';
import { setCurrentMapCenter, setCurentMapZoom } from 'store';
import { setCurrentMapZoom } from 'store';
import useConsumeDirectMap from 'customHooks/MapPackage/useConsumeDirectMap';

function MapPackageComponent({ fitworld }) {
  const dispatch = useDispatch();
  const {
    mapPagePosition,
    directMap,
    directInitError,
    mapVector,
    vectorName,
    lastPanelDisplayed,
    isPermalinkClick,
    persistPointer,
    tileArray,
  } = useDirectorFun('left');

  const mapParameters = {
    map: null,
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
  let p = mapParRef?.current;
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

  // useEffect(() => {
  //   if (!mapPagePosition.lat) {
  //     dispatch(setLastPanelDisplayed({ direction: 'left', value: null }));
  //   }
  // }, [mapPagePosition.lat]);

  const closeContextMenu = () => setCtxMenu((s) => ({ ...s, visible: false }));

  useLMapResize(mapParRef);

  useEffect(() => {
    if (!persistPointer) return;

    const pointerDisabled =
      mapPagePosition?.lat === null || mapPagePosition?.lng === null;

    if (pointerDisabled) {
      dispatch(setPersistPointer({ direction: 'left', value: false }));
      return;
    }
    const hasValidPosition =
      Number.isFinite(mapPagePosition?.lat) &&
      Number.isFinite(mapPagePosition?.lng);

    if (!hasValidPosition) return;
    PackageMapServices.clickMap(
      {
        latlng: {
          lat: mapPagePosition.lat,
          lng: mapPagePosition.lng,
        },
      },
      mapParRef,
      vectorName,
      dispatch,
      null,
      'left',
      {
        isProgrammatic: true,
        invalidateSimData: false,
        resetDataArrived: false,
        allowSamePointToggleOff: false,
      }
    );

    syncReduxFromLeaflet(mapParRef, dispatch);

    dispatch(setPersistPointer({ direction: 'left', value: false }));
  }, [
    persistPointer,
    mapPagePosition?.lat,
    mapPagePosition?.lng,
    vectorName,
    dispatch,
  ]);

  const consumedDirectMapRef = useRef(null);
  useConsumeDirectMap(consumedDirectMapRef, mapParRef);
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
