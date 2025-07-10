import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PanelContextV2 from 'context/panelsIconsV2';
import FetcherService from 'services/FetcherService';
import { setMapVector } from 'store';
import { setVectorName } from 'store';
import { setDirectInitError } from 'store';
import { setReadyToView } from 'store';
import { setMapPagePosition } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { setDisplaySimulationPanel } from 'store';
import useDirectorFun from '../useDirectorFun';
import useSessionControl from './useSessionControl';
import { setCurrentMapCenter } from 'store';
import { setCurrentMapBounds } from 'store';
import { setCurrentMapZoom } from 'store';
import useQuery from './useQuery';
import { setTileArray } from 'store';
import { map } from 'leaflet';
import {
  setLastPanelDisplayed,
  setOpenItems,
  setPanelOpen,
} from 'components/mapMenu/menuStore/mapMenuSlice';
import { setPanelInterfere } from 'store';
import { setDirectInit } from 'store';

const useFetcherStates = () => {
  let direction = 'left';
  const dispatch = useDispatch();
  const { mapVector, mapPagePosition, tileArray, tileIcons, panelData, menuStructure } =
    useDirectorFun(direction);
  const { tile, panel, decade, lon, lat, session } = useQuery();

  useSessionControl(session);
  useEffect(() => {
    if (
      session === null &&
      tile === null &&
      panel === null &&
      decade === null &&
      lon === null &&
      lat === null
    ) {
      return;
    }
  });
  useEffect(() => {
    if (mapPagePosition.lat === null) {
      dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
    }
  });
  useEffect(() => {
    if (session === 'albopictus') {
      if (tile === null || tile === undefined) {
        dispatch(setTileArray(['colegg']));
        dispatch(setReadyToView(false));
      }
    } else if (session === 'papatasi') {
      if (tile === null || tile === undefined) {
        dispatch(setTileArray(['papatasi_aprdec']));
        dispatch(setReadyToView(false));
      }
    }
  }, [tile, dispatch, session]);

  useEffect(() => {
    if (mapPagePosition.lat === null || mapPagePosition.lat === undefined) {
      if (lon && lat) {
        dispatch(
          setMapPagePosition({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          })
        );
      }
      if (!lon || !lat) {
        dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
      }
    }
  }, [lon, lat, dispatch, mapPagePosition]);

  useEffect(() => {
    if (menuStructure.filter((item) => item.key === panel).length > 0) {
      console.log('useFetcherStates panel', panel);
      dispatch(setLastPanelDisplayed({ direction, value: panel }));
      dispatch(setPanelInterfere({ direction, value: -1 }));
    }

    // dispatch(setOpenItems({ direction, value: { menu_icon: true } }));
    // panel || dispatch(setPanelInterfere({ direction, value: 0 }));
  }, [panel, menuStructure, direction, dispatch]);

  useEffect(() => {
    if (
      session === 'albopictus' &&
      tileIcons.filter((item) => item.key === 'colegg').length === 0
    ) {
      dispatch(setReadyToView(false));
      return;
    }
    if (
      session === 'papatasi' &&
      tileIcons.filter((item) => item.key === 'papatasi_aprdec').length === 0
    ) {
      dispatch(setReadyToView(false));

      return;
    }
    try {
      console.log('useFetcherStates rerendered');
      FetcherService.handleTiles(dispatch, tile, tileIcons);
      FetcherService.handlePanels(dispatch, panel, panelData, lon, lat);
    } catch (e) {
      dispatch(
        setDirectInitError({
          direction,
          value: {
            isError: true,
            message: {
              heading: e.heading,
              explanation: e.explanation,
            },
            type: e.type,
          },
        })
      );
    }

    dispatch(setReadyToView(true));

    //setting ready to view... are we going to handle directMap.display===-2 situation?
  }, [tile, session, panel, lon, lat, dispatch, decade, tileIcons.length, panelData.length]);
};
export default useFetcherStates;
