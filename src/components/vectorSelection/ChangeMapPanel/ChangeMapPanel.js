// ChangeMapPanel.js
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setPageTransition } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import { getVector, ALL_VECTORS } from 'vectors/registry';
import useDirectorFun from 'customHooks/useDirectorFun';

import './ChangeMapPanel.css';
import {
  setMapPagePosition,
  setPersistPointer,
  setPanelOpen,
  setReadyToView,
} from 'store';

function ChangeMapPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // current map/vector state
  const {
    vectorName,
    currentMapCenter,
    currentMapZoom,
    mapPagePosition,
    persistPointer,
  } = useDirectorFun('left');

  // whatever is in Redux (may contain duplicates)
  const vectorNamesFromStore = useSelector((state) => state.vector.vectorNames);

  // 🔑 Build a clean, unique list of IDs to render
  const vectorIds = useMemo(() => {
    // if store has something, use it; otherwise, use registry list
    const baseIds =
      Array.isArray(vectorNamesFromStore) && vectorNamesFromStore.length > 0
        ? vectorNamesFromStore
        : ALL_VECTORS.map((v) => v.id);

    // dedupe by ID
    return Array.from(new Set(baseIds));
  }, [vectorNamesFromStore]);

  // const handleChangeTile = (desiredVectorId) => {
  //   const vec = getVector(desiredVectorId);
  //   if (!vec) return;
  //   // PackageMapServices.handleToMapPageTransition(
  //   //   dispatch,
  //   //   vectorName,
  //   //   desiredVectorId
  //   // );
  //   PackageMapServices.handleMapSwitch(
  //     dispatch,
  //     vectorName,
  //     desiredVectorId,
  //     currentMapCenter,
  //     currentMapZoom,
  //     mapPagePosition
  //   );
  //   if (mapPagePosition && !persistPointer) {
  //     // dispatch(setMapPagePosition({ lat: mapPage.lat, lng: position.lng })); // Reset map position to trigger any necessary updates
  //     dispatch(setPersistPointer({ direction: 'left', value: true }));
  //   }
  //   dispatch(setPanelOpen({ direction: 'left', value: false }));
  //   dispatch(setReadyToView(false));
  //   navigate(vec?.meta?.route || `/MapPage?session=${desiredVectorId}`);
  // };
  const handleChangeTile = (desiredVectorId) => {
    const vec = getVector(desiredVectorId);
    if (!vec) return;

    PackageMapServices.handleMapSwitch(
      dispatch,
      vectorName,
      desiredVectorId,
      currentMapCenter,
      currentMapZoom,
      mapPagePosition
    );

    const hasValidPosition =
      Number.isFinite(mapPagePosition?.lat) &&
      Number.isFinite(mapPagePosition?.lng);

    if (hasValidPosition) {
      dispatch(setPersistPointer({ direction: 'left', value: true }));
    } else {
      dispatch(setPersistPointer({ direction: 'left', value: false }));
    }

    dispatch(setPanelOpen({ direction: 'left', value: false }));
    dispatch(setReadyToView(false));

    navigate(vec?.meta?.route || `/MapPage?session=${desiredVectorId}`);
  };
  const listVectors = vectorIds.map((id) => {
    const vec = getVector(id);
    if (!vec) return null;

    const meta = vec.meta || {};
    const icon = meta.icon;
    const description = meta.description;
    const route =
      meta.route ||
      (meta.session
        ? `/MapPage?session=${encodeURIComponent(meta.session)}`
        : '/MapPage');

    const isActive = id === vectorName;
    const className =
      'panel-content icons-area ' + (isActive ? 'active' : 'inactive');

    return (
      <div key={id} className="description-row">
        <div>
          <Link
            to={route}
            onClick={(e) => {
              e.preventDefault();
              handleChangeTile(id);
            }}
            className={className}
          >
            {icon && <img alt={`${id}-icon`} src={icon} />}
          </Link>
        </div>
        <div>{description}</div>
      </div>
    );
  });

  return (
    <div className="text-area">
      <h1>Model Repository</h1>
      <div className="map-descriptions-wrapper">{listVectors}</div>
    </div>
  );
}

export default ChangeMapPanel;
