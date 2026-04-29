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
import { setLastPanelDisplayed } from 'store';
import { setDirectMap } from 'store';
import { setPersistPointer } from 'store';
import { setCurrentMapCenter } from 'store';
import { setCurrentMapZoom } from 'store';
import { syncReduxFromLeaflet } from 'utils/syncReduxFromLeaflet';
import { getVector } from 'vectors/registry';
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
  const vec = getVector(vectorName);
  useEffect(() => {
    if (!persistPointer) return;
    if (persistPointer) {
      console.log('Persisting pointer for permalink click', mapPagePosition);

      PackageMapServices.clickMap(
        {
          latlng: {
            lat: mapPagePosition.lat || vec.map.defaultCenter.lat,
            lng: mapPagePosition.lng || vec.map.defaultCenter.lng,
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

      const map = mapParRef.current?.map;
      if (map) {
        syncReduxFromLeaflet(mapParRef, dispatch);
      }
    }

    dispatch(setPersistPointer({ direction: 'left', value: false }));
  }, []);
  const consumedDirectMapRef = useRef(null);

  useEffect(() => {
    const isActive =
      directMap?.display !== -2 &&
      directMap?.display != null &&
      Number.isFinite(directMap?.lat) &&
      Number.isFinite(directMap?.lon);

    if (!isActive) return;

    const key = `${directMap.lat}:${directMap.lon}:${directMap.display}`;
    if (consumedDirectMapRef.current === key) return;
    consumedDirectMapRef.current = key;

    const e = {
      latlng: {
        lat: directMap.lat,
        lng: directMap.lon,
      },
    };
    console.log('Processing directMap change', {
      directMap,
      key,
      mapPagePosition,
    });
    PackageMapServices.handleMapClick(
      e,
      mapParRef,
      mapVector,
      dispatch,
      directMap,
      mapPagePosition,
      'left',
      {
        invalidateSimData: false,
        allowSamePointToggleOff: false,
        isProgrammatic: true,
        resetDataArrived: false,
      }
    );

    dispatch(
      setDirectMap({
        direction: 'left',
        value: {
          lat: null,
          lon: null,
          display: -2,
        },
      })
    );
  }, [directMap, mapVector, dispatch]);

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
