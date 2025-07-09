import markerLogo from 'assets/images/VEClim-Map-Icon-30x30px.png';
import L from 'leaflet';
import 'leaflet-side-by-side';

import {
  setMapPagePosition,
  setPanelInterfere,
  setPanelOpen,
  setSwitchMap,
  setMapLoaded,
  setLeftMapLoaded,
  setRightMapLoaded,
  setCurrentMapCenter,
  setCurrentMapZoom,
  setVectorName,
  setTileArray,
  setDisplayedPanelID,
  setCurrentMapBounds,
  setMapVector,
} from 'store';
import TileLoaderService from '../../../customHooks/TileLoaderService';
import ErrorScreenMap from 'components/map/errorScreen/ErrorScreenMap';
import { setCurrentMaxBounds } from 'store';
import { setDisplayReady } from 'store';
import { setIsTsDataSet } from 'store';
import { setInvalidateSimData } from 'store';
import { setDataArrived } from 'store';
import { setOpenItems } from 'store';
import { zIndex } from 'material-ui/styles';
import { setPlotReady } from 'store';
import { setInvalidateTsData } from 'store';
import { setLastPanelDisplayed } from 'components/mapMenu/menuStore/mapMenuSlice';

class PackageMapServices {
  static baseLayer = L.tileLayer(
    'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.webp',
    { attribution: '', noWrap: true }
  ); // '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  static baseLayerOSM = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '', noWrap: true } //'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  );
  static dataLayer = L.tileLayer('https://veclim.com/api?v=vabun_v015&z={z}&x={x}&y={y}', {
    zIndex: 1000,
    attribution: '',
    noWrap: true,
  });
  static labelLayer = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.webp',
    { zIndex: 2000, attribution: '', noWrap: true } // '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  );
  static cyprusBounds = [
    [34.25, 31.5],
    [36, 35],
  ];

  static worldBounds = [
    [-90, -180],
    [90, 180],
  ];
  static defaultWorldCenter = { lat: 0, lng: 0 };
  static defaultCypCenter = { lat: 35.1, lng: 33.33 };
  static icon1 = L.icon({
    iconUrl: markerLogo,
    iconSize: [30, 30],
    iconAnchor: [15, 30], // The point of the icon that corresponds to the marker's location
    popupAnchor: [0, -30],
  });

  static resizeMap(mapParRef, vectorName, dispatch) {
    let p = mapParRef.current;
    this.setMinZoom(mapParRef, vectorName);

    p.map.setMaxBounds(p.maxBounds);

    let newZoom = this.calculateZoomForBounds(mapParRef);
    p.zoom = p.map.getZoom();
    let tempMin = newZoom < 2 ? p.zoom : newZoom;

    p.map.setMinZoom(tempMin);
    p.minZoom = tempMin;
    dispatch(setCurrentMapZoom(p.zoom));

    // p.map.setView([p.center[0], p.center[1]], p.zoom);
  }

  static handleToMapPageTransition(dispatch, vectorName, mapVector) {
    if (mapVector === 'albopictus') {
      dispatch(setCurrentMapBounds(PackageMapServices.worldBounds));
      // dispatch(setDirectMap({ lon: null, lat: null, display: -2 }));
    } else if (mapVector === 'papatasi') {
      dispatch(setCurrentMapBounds(PackageMapServices.cyprusBounds));
      // dispatch(setDirectMap({ lon: null, lat: null, display: -2 }));
    } else {
      dispatch(setVectorName(mapVector));
      dispatch(setMapVector(mapVector));
    }
    // dispatch(setPageTransition(true));
  }
  static handleMapSwitch(dispatch, vectorName, desiredVector) {
    if (desiredVector === vectorName) {
      return;
    }
    dispatch(setSwitchMap(false));
    if (desiredVector === 'papatasi') {
      dispatch(setVectorName('papatasi'));
      dispatch(setMapVector('papatasi'));
      dispatch(setTileArray(['papatasi_aprdec']));
      dispatch(setCurrentMapCenter(this.defaultCypCenter));
      dispatch(setCurrentMapBounds(this.cyprusBounds));
      dispatch(setCurrentMaxBounds(this.cyprusBounds));
      dispatch(setCurrentMapZoom(8));
      dispatch(setDisplayReady(false));
    } else {
      dispatch(setVectorName('albopictus'));
      dispatch(setMapVector('albopictus'));
      dispatch(setTileArray(['colegg']));
      dispatch(setCurrentMapCenter(this.defaultCypCenter));
      dispatch(setCurrentMapBounds(this.worldBounds));

      dispatch(setCurrentMaxBounds(this.worldBounds));
      dispatch(setCurrentMapZoom(8));
      dispatch(setDisplayReady(false));
    }
    dispatch(setInvalidateSimData(false));
    dispatch(setPanelInterfere({ direction: 'left', value: 0 }));
    dispatch(setOpenItems({}));
    dispatch(setLastPanelDisplayed({ direction: 'left', value: 'location_info_panel' }));
  }

  static handleMapClick(e, mapParRef, vectorName, dispatch, directMap, mapPagePosition, direction) {
    dispatch(setInvalidateSimData(true));
    dispatch(setDataArrived({ direction: direction, value: false }));

    this.clickMap(e, mapParRef, vectorName, dispatch, mapPagePosition, direction);

    // if (directMap) {
    //   if (directMap.display === -2) dispatch(setPanelInterfere({ direction, value: -1 }));
    // } else {
    //   dispatch(setPanelInterfere({ direction, value: -1 }));
    // }
    // if (directMap) {
    //   dispatch(setPanelInterfere({ direction, value: null }));
    // }

    dispatch(setPanelInterfere({ direction, value: -1 }));
  }
  static clickMap = (e, mapParRef, vectorName, dispatch, mapPagePosition, direction) => {
    let p = mapParRef.current;
    const switchZoom = 4;
    let newPosition = this.roundPosition(vectorName, e.latlng.lat, e.latlng.lng);

    newPosition = { ...newPosition, res: [0.125, 0.125] };
    p.prevClickPointRef = newPosition;
    dispatch(setMapPagePosition({ lat: newPosition.lat, lng: newPosition.lng }));
    dispatch(setPlotReady({ direction: 'left', value: false }));
    p.highlightMarker && p.map.removeLayer(p.highlightMarker);
    p.iconMarker && p.map.removeLayer(p.iconMarker);
    p.rectMarker && p.map.removeLayer(p.rectMarker);
    const { res, ...newPosition1 } = newPosition;

    p.iconMarker = L.marker(newPosition1, { icon: this.icon1 }).addTo(p.map);
    p.iconMarker.on('click', (markerEvent) => {
      if (markerEvent.originalEvent) {
        markerEvent.originalEvent.preventDefault();
        markerEvent.originalEvent.stopPropagation();
      }
      markerEvent.originalEvent.stopPropagation();
      console.log('marker clicked');
      p.prevClickPointRef = null;
      // Remove this marker from the map
      p.iconMarker.remove();
      p.map.removeLayer(p.iconMarker);
      dispatch(setMapPagePosition({ lat: null, lng: null }));
      dispatch(setInvalidateSimData(true));
      dispatch(setDataArrived({ direction: direction, value: false }));

      p.iconMarker = null;
    });

    if (
      mapPagePosition &&
      newPosition.lat === mapPagePosition.lat &&
      newPosition.lng === mapPagePosition.lng
    ) {
      p.rectMarker && p.map.removeLayer(p.rectMarker);
      p.iconMarker && p.map.removeLayer(p.iconMarker);
      p.iconMarker = null;
      p.rectMarker = null;
      dispatch(setMapPagePosition({ lat: null, lng: null }));
      dispatch(setInvalidateSimData(true));
      dispatch(setDataArrived({ direction, value: false }));
    } else {
      p.rectMarker = this.highlightMarkerFunc(
        newPosition.lat,
        newPosition.lng,
        mapParRef,
        '',
        'green',
        vectorName,
        dispatch
      ).addTo(p.map);
    }

    if (p.map.getZoom() > switchZoom) {
      p.iconMarker && p.map.removeLayer(p.iconMarker);
    } else {
      p.rectMarker && p.map.removeLayer(p.rectMarker);
    }
  };

  static highlightMarkerFunc = (lat, lng, mapParRef, className, color, vectorName, dispatch) => {
    let p = mapParRef && mapParRef.current;
    let newMarker;
    if (p.map) {
      const newPosition = this.roundPosition(vectorName, lat, lng);

      newMarker = L.rectangle(
        [
          [newPosition.lat + newPosition.res[1], newPosition.lng - newPosition.res[0]],
          [newPosition.lat - newPosition.res[1], newPosition.lng + newPosition.res[0]],
        ],
        {
          className: className,
          color: color,
          interactive: true,
          fill: true,
          fillOpacity: 0.3,
          pane: 'markerPane',
        }
      );
      newMarker.addTo(p.map);
    }
    return newMarker;
  };
  static roundPosition(vectorName, lat, lng) {
    function roundPositionMosq(lat, lng) {
      let roundedLat = 0.0 + Math.round(lat / 0.25) * 0.25;
      let roundedLng = 0.0 + Math.round(lng / 0.25) * 0.25;
      return {
        lat: roundedLat,
        lng: roundedLng,
        res: [0.125, 0.125],
      };
    }
    function roundPositionSand(lat, lng) {
      let roundedLat = 0.009 + Math.round((lat - 0.009) / 0.0215) * 0.0215;
      let roundedLng = 0.0033 + Math.round((lng - 0.0033) / 0.0215) * 0.0215;
      return {
        lat: roundedLat,
        lng: roundedLng,
        res: [0.0215 / 2.0, 0.0215 / 2.0],
      };
    }

    if (vectorName === 'albopictus') {
      return roundPositionMosq(lat, lng);
    } else {
      return roundPositionSand(lat, lng);
    }
  }
  static updateCoordinates({ e, mapParRef, vectorName, dispatch }) {
    let p = mapParRef.current;
    if (!e.latlng) return;
    p.zoom = p.map.getZoom();
    let tempCenter = p.map.getCenter();
    p.center = { lat: tempCenter.lat, lng: tempCenter.lng };

    const { lat, lng } = e.latlng;
    p.highlightMarker && p.map.removeLayer(p.highlightMarker);
    let newPosition = this.roundPosition(vectorName, lat, lng);
    p.highlightMarker = this.highlightMarkerFunc(
      newPosition.lat,
      newPosition.lng,
      mapParRef,
      'marker-green',
      'blue',
      vectorName
    );
    let elm = document.getElementById('coordinates');
    elm.innerHTML = `lat<br/>${newPosition.lat.toFixed(2)}<br/>${newPosition.lng.toFixed(
      2
    )}<br/>lon`;
    elm.style.display = 'flex';
  }
  static calculateBounds(value) {
    return L.latLngBounds(L.latLng(value[0][0], value[0][1]), L.latLng(value[1][0], value[1][1]));
  }

  static mapBounds(
    mapParRef,
    vectorName,
    pageTransition,
    switchMap,
    currentMapCenter,
    currentMapZoom,
    dispatch
  ) {
    let p = mapParRef.current;

    let bounds = p.map ? p.map.getBounds() : null;
    const boundsArray = [
      [bounds._southWest.lat, bounds._southWest.lng], // South West corner
      [bounds._northEast.lat, bounds._northEast.lng], // North East corner
    ];
    if (vectorName === 'albopictus' && !switchMap) {
      p.maxBounds = this.calculateBounds(this.worldBounds);
      p.center = p.center ? p.center : this.defaultWorldCenter;
      p.zoom = p.zoom ? p.zoom : 1;
    } else if (vectorName === 'albopictus' && switchMap) {
      p.maxBounds = this.calculateBounds(this.worldBounds);
      p.center = p.center ? p.center : this.defaultCypCenter;

      p.zoom = p.zoom ? p.zoom : 3;
    } else {
      p.maxBounds = this.calculateBounds(this.worldBounds);
      p.center = p.center ? p.center : this.defaultCypCenter;
      p.zoom = p.zoom ? p.zoom : 3;
    }
    if (pageTransition) {
      p.center = currentMapCenter;
      p.zoom = currentMapZoom;
    }
    bounds && dispatch(setCurrentMapBounds(boundsArray));

    const boundsArray1 = [
      [p.maxBounds._southWest.lat, p.maxBounds._southWest.lng], // South West corner
      [p.maxBounds._northEast.lat, p.maxBounds._northEast.lng], // North East corner
    ];

    dispatch(setCurrentMaxBounds(boundsArray1));
    dispatch(setCurrentMapZoom(p.zoom));
    dispatch(setCurrentMapCenter(p.center));
    dispatch(setSwitchMap(false));
    // this.markerHandler(mapParRef, 4, vectorName, dispatch);
  }
  static setMinZoom(mapParRef, vectorName) {
    let p = mapParRef.current;

    let newMinZoom = 2;
    if (vectorName === 'albopictus') {
      newMinZoom = p.map.getBoundsZoom(this.worldBounds, true);
    } else {
      newMinZoom = p.map.getBoundsZoom(this.cyprusBounds, false);
    }
    if (p.map.getZoom() < newMinZoom) {
      p.map.setZoom(newMinZoom);
    }
    p.map.setMinZoom(newMinZoom);

    p.minZoom = newMinZoom;
    return newMinZoom;
  }
  static calculateZoomForBounds(mapParRef, bounds) {
    // Get the size of the map container

    if (bounds) {
      let p = mapParRef.current;
      var zoom = p.map.getZoom();
      var nw = p.map.project(bounds.getNorthWest(), zoom);
      var se = p.map.project(bounds.getSouthEast(), zoom);

      // Calculate the bounds size in pixels at the current zoom level
      var boundsSize = nw.distanceTo(se);

      // Calculate the scaling factor to fit the bounds into the current map size
      var scaleX = window.innerWidth / boundsSize;
      var scaleY = window.innerHeight / boundsSize;

      // Calculate the zoom adjustment based on the scaling factor
      var zoomAdjustment = Math.log(Math.min(scaleX, scaleY)) / Math.log(2);
      // Adjust the current zoom level
      var newZoom = zoom + zoomAdjustment;

      return newZoom;
    }
  }

  static mouseOut = (mapParRef) => {
    let p = mapParRef.current;
    p.highlightMarker && p.map.removeLayer(p.highlightMarker);
    let elm = document.getElementById('coordinates');
    elm.innerHTML = '';
    elm.style.display = 'none';
  };
  static debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static handleDoubleMap(mapParRef, tileMat, tileArray, dispatch) {
    let p = mapParRef.current;
    let sideBySideMap = p.sideBySide;
    let tempCenter = p.map.getCenter();
    p.center = { lat: tempCenter.lat, lng: tempCenter.lng };

    p.zoom = p.map.getZoom();
    if (tileArray.length === 0) {
      dispatch(setMapLoaded(false));
      sideBySideMap && sideBySideMap.remove();
      tileMat = [];
    } else if (tileArray.length === 1) {
      dispatch(setMapLoaded(false));
      if (sideBySideMap) {
        sideBySideMap.remove();
      }
    } else {
      p.map.createPane('left');
      p.map.createPane('right');
      dispatch(setLeftMapLoaded(false));
      dispatch(setRightMapLoaded(false));
      sideBySideMap && sideBySideMap.remove();
      p.sideBySide = L.control
        .sideBySide([tileMat[0]], [tileMat[1]], {})

        .addTo(p.map);
    }
  }

  static addTiles(mapParRef, tileArray, tilesFromContext, dispatch, tileOpacity) {
    let tileMat = [];
    let p = mapParRef.current;
    if (tileArray.length === 0) return [];
    tileArray.forEach((tile, index) => {
      let selectedTile = tilesFromContext.find((tileIcon) => tileIcon.key === tile);
      try {
        selectedTile &&
          tileMat.push(
            L.tileLayer(selectedTile.tileLayer.tile, {
              ...selectedTile.tileLayer.props,
              opacity: tileOpacity || 1,
            })
          );
      } catch (e) {
        <ErrorScreenMap error={e}></ErrorScreenMap>;
      }
    });

    TileLoaderService.handleTileStyles(tileMat, dispatch, tileArray);
    tileMat.forEach((tile, index) => {
      tile.addTo(p.map);
    });
    return tileMat;
  }

  static _removeMarker({ mapParRef, marker1 }) {
    let p = mapParRef && mapParRef.current;
    marker1 && p.map.removeLayer(marker1);
    marker1 = {};
  }
  // marker1 = null;

  static markerHandler = (mapParRef, switchZoom, vectorName, dispatch, mapPagePosition) => {
    let p = mapParRef.current;
    if (p) {
      p.zoom = p.map.getZoom();
      p.center = {
        lat: p.map.getCenter().lat,
        lng: p.map.getCenter().lng,
      };

      if (p.prevClickPointRef) {
        p.iconMarker && p.map.removeLayer(p.iconMarker);
        p.rectMarker && p.map.removeLayer(p.rectMarker);
        p.highlightMarker && p.map.removeLayer(p.highlightMarker);
        let newPosition = p.prevClickPointRef;
        if (p.map.getZoom() > switchZoom) {
          p.iconMarker && p.map.removeLayer(p.iconMarker);
          p.rectMarker =
            p.rectMarker &&
            this.highlightMarkerFunc(
              newPosition.lat,
              newPosition.lng,
              mapParRef,
              '',
              'green',
              vectorName
            );
        } else {
          p.rectMarker && p.map.removeLayer(p.rectMarker);
          p.iconMarker = p.rectMarker && L.marker(newPosition, { icon: this.icon1 }).addTo(p.map);
        }
      } else {
        p.prevClickPointRef = null;
        return;
      }
    }
    dispatch(setCurrentMapCenter(p.center));
    dispatch(setCurrentMapZoom(p.zoom));
  };
}
export default PackageMapServices;
