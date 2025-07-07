import { current } from '@reduxjs/toolkit';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import PanelContextV2 from 'context/panelsIconsV2';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentMapZoom } from 'store';
import { setTileArray } from 'store';
import { setReadyToView } from 'store';
import { setCurrentMapCenter } from 'store';
import { setCurrentMapBounds } from 'store';
import { setMapVector, setVectorName, setDirectInitError, setMapPagePosition } from 'store';

const defaultAlboBehaviour = (dispatch, mapVector, mapPagePosition, tile) => {
  dispatch(setMapVector('albopictus'));
  dispatch(setCurrentMapBounds(PackageMapServices.worldBounds));
  dispatch(setCurrentMapCenter(PackageMapServices.defaultCypCenter));
  dispatch(setCurrentMapZoom(2));
  mapPagePosition.lat === null && dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
  if (!tile) {
    dispatch(setTileArray(['colegg']));
  }
};

const defaultPapatasiBehaviour = (dispatch, mapVector, mapPagePosition, tile) => {
  dispatch(setMapVector('papatasi'));

  dispatch(setCurrentMapBounds(PackageMapServices.cyprusBounds));
  dispatch(setCurrentMapCenter(PackageMapServices.defaultCypCenter));
  dispatch(setCurrentMapZoom(8));
  mapPagePosition.lat === null && dispatch(setMapPagePosition(PackageMapServices.defaultCypCenter));
  if (!tile) {
    dispatch(setTileArray(['papatasi_aprdec']));
  }
};

function useSessionControl(session, tile) {
  const direction = 'left'; // Assuming direction is always 'left' for this hoo
  const { vectorNames, mapVector, mapPagePosition } = useDirectorFun(direction);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      if (vectorNames.includes(session)) {
        dispatch(setMapVector(session));
        dispatch(setVectorName(session));
      } else {
        const e = new Error('No Session Found');
        e.type = 'SessionError';
        e.heading = `Session ${session} Not Found`;
        e.explanation = `Available sessions are: ${vectorNames.join(', ')}`;
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
        // TODO: INVOKE ERROR MESSAGE ABOUT INVALID SESSION
      }
    }
  }, [session, dispatch, vectorNames, direction]);

  useEffect(() => {
    if (session === 'albopictus') {
      defaultAlboBehaviour(dispatch, mapVector, mapPagePosition, tile);
      dispatch(setReadyToView(false));
    } else if (session === 'papatasi') {
      defaultPapatasiBehaviour(dispatch, mapVector, mapPagePosition, tile);
      dispatch(setReadyToView(false));
    }
  }, [session, dispatch]);
}

export default useSessionControl;
