import './SimTile.css';
import { ReactComponent as DeleteIcon } from 'assets/icons/django/delete-icon.svg';
import { ReactComponent as ViewIcon } from 'assets/icons/django/chart-line-icon.svg';
import { ReactComponent as InfoIcon } from 'assets/icons/django/info-icon.svg';
import {
  describeSimulationParams,
  getSimulationCoordinates,
} from './simParams';
import { useDeleteSimulationMutation } from 'store';
import SimDate from './SimDate';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetSimulationListQuery } from 'store';
import StatusIndicator from './StatusIndicator';
import simTileHelpers from './simTileHelpers';
import { useAlboData } from 'context/AlboDataContext';
import useSimTileFunctions from './useSimTileFunctions';
import { setShimmered } from 'store';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';
import { setMapPagePosition } from 'store';
import { setDirectMap, setCurrentMapCenter, setCurrentMapZoom } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import useDirectorFun from 'customHooks/useDirectorFun';

function SimTile({ sim, direction, shimmerList }) {
  const dispatch = useDispatch();

  const [displayIcon, setDisplayIcon] = useState(false);

  const [deleteSimulation] = useDeleteSimulationMutation();
  const [triggerFetch] = useLazyGetSimulationListQuery();
  const setErrorSim = useAlboData().setErrorSim;
  const levelData = useSelector((state) => state.mapMenu.left.panelLevel);

  const { setSimResult, setIsLoadingSim, setSimMeta } = useAlboData();
  const {
    simRecord,
    isAlboChik,
    displayViewIcon,
    isFailureState,
    errorMessage,
    isPollStalled,
  } = useSimTileFunctions(sim);
  const { currentMapCenter, currentMapZoom, vectorName } =
    useDirectorFun('left');
  const [showDetails, setShowDetails] = useState(false);
  const coords = getSimulationCoordinates(simRecord?.model_data);
  const params = describeSimulationParams(simRecord?.model_data);
  const handleDeleteSimulation = (id) => {
    simTileHelpers.handleDeleteSimulation(deleteSimulation, id);
  };

  const handleDownload = async (id) => {
    try {
      const payload = await triggerFetch({ id, return_results: true }).unwrap();
      const results = payload?.results ?? payload;
      const coords = getSimulationCoordinates(payload?.model_data);
      const parameters = {};
      describeSimulationParams(payload?.model_data).forEach((p) => {
        parameters[p.label] = p.value;
      });
      simTileHelpers.handleDownload(
        {
          simulation: {
            id: payload?.id ?? id,
            title: payload?.title ?? null,
            model_type: payload?.model_type ?? null,
            status: payload?.status ?? null,
            created_at: payload?.created_at ?? null,
            updated_at: payload?.updated_at ?? null,
            location: coords
              ? { latitude: coords.lat, longitude: coords.lng }
              : null,
            parameters,
            model_data: payload?.model_data ?? null,
          },
          results,
        },
        id
      );
    } catch (e) {
      console.error('Failed to download results:', e);
    }
  };

  const focusLocation = (lat, lon) => {
    const zoom = 5;
    const scale = 256 * Math.pow(2, zoom);
    const rad = Math.PI / 180;
    const mx = ((lon + 180) / 360) * scale;
    const my =
      (0.5 - Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2)) / (2 * Math.PI)) *
      scale;
    const isNarrow = window.innerWidth <= 499;
    const cx = isNarrow ? mx : mx - 270;
    const cy = isNarrow ? my + window.innerHeight * 0.25 : my;
    const centerLng = (cx / scale) * 360 - 180;
    const centerLat =
      (2 * Math.atan(Math.exp((0.5 - cy / scale) * 2 * Math.PI)) - Math.PI / 2) /
      rad;

    dispatch(
      setDirectMap({
        direction,
        value: {
          lat,
          lon,
          display: 1,
          center: { lat: centerLat, lng: centerLng },
          zoom,
        },
      })
    );
  };

  const handleViewSimulationResults = async (id) => {
    dispatch(setShimmered({ direction, value: shimmerList }));
    setIsLoadingSim(true);
    setErrorSim(null);

    try {
      const payload = await triggerFetch({ id, return_results: true }).unwrap();
      const results = payload?.results ?? payload;

      const coords = getSimulationCoordinates(payload?.model_data);

      if (!coords) {
        console.error('Invalid simulation coordinates', { payload });
        return;
      }

      focusLocation(coords.lat, coords.lng);

      setSimMeta({ id, model_data: payload?.model_data ?? null });

      simTileHelpers.handleViewSimulationResults(
        results,
        setSimResult,
        setErrorSim,
        dispatch,
        direction,
        levelData,
        () => {}
      );
    } catch (err) {
      console.error('Failed to load simulation results:', err);
      setErrorSim(err);
    } finally {
      setIsLoadingSim(false);
    }
  };
  return (
    <div
      key={sim.id}
      className="sim-list-item float-bg2"
      onMouseEnter={() => setDisplayIcon(true)}
      onMouseLeave={() => setDisplayIcon(false)}
      onClick={() => setDisplayIcon(true)}
    >
      <div className="sim-row">
      <div className="tile-entry">
        <p>Id:&nbsp;</p>
        <p>{sim.id}</p>
        <SimDate sim={sim} />
      </div>
      {coords && (
        <button
          type="button"
          className="sim-coords-btn"
          onClick={() => focusLocation(coords.lat, coords.lng)}
          title="Go to this location"
        >
          lat:{coords.lat.toFixed(2)} lng:{coords.lng.toFixed(2)}
        </button>
      )}
      <div className="icon-area">
        <span className="icon-cell">
          <ToolTipComponent label="parameters" placement="top">
            <button
              type="button"
              className={`icon-btn ${showDetails ? 'icon-btn--active' : ''}`}
              onClick={() => setShowDetails((v) => !v)}
              aria-label="Simulation parameters"
              aria-expanded={showDetails}
            >
              <InfoIcon className="sim-icon icon-img" />
            </button>
          </ToolTipComponent>
        </span>

        {/* Eye (left slot) — reserve space via visibility toggle */}
        <span
          className={`icon-cell ${
            isAlboChik && displayViewIcon && displayIcon
              ? ''
              : 'hidden-keep-space'
          }`}
        >
          <ToolTipComponent label="view results" placement="top">
            <button
              type="button"
              className="icon-btn"
              onClick={() => handleViewSimulationResults(sim.id)}
              aria-label="View results"
            >
              <ViewIcon className="sim-icon icon-img" />
            </button>
          </ToolTipComponent>
        </span>

        {/* Status (middle slot) — always rendered */}
        <span className="icon-cell">
          <StatusIndicator
            status={simRecord?.status || sim.status}
            setDownloadResult={() => handleDownload(sim.id)}
            isFailureState={isFailureState}
            errorMessage={errorMessage}
            isPollStalled={isPollStalled}
          />
        </span>

        {/* Trash (right slot) — reserve space via visibility toggle */}
        <span className={`icon-cell ${displayIcon ? '' : 'hidden-keep-space'}`}>
          <ToolTipComponent label="delete" placement="top">
            <button
              type="button"
              className="icon-btn"
              onClick={() => handleDeleteSimulation(sim.id)}
              aria-label="Delete simulation"
            >
              <DeleteIcon className="sim-icon icon-img" />
            </button>
          </ToolTipComponent>
        </span>
      </div>
      </div>
      {showDetails && (
        <div className="sim-details" role="region" aria-label="Simulation parameters">
          {coords && (
            <>
              <div className="sim-details__row">
                <span>Latitude</span>
                <span>{coords.lat.toFixed(2)}</span>
              </div>
              <div className="sim-details__row">
                <span>Longitude</span>
                <span>{coords.lng.toFixed(2)}</span>
              </div>
            </>
          )}
          {params.map((p) => (
            <div className="sim-details__row" key={p.label}>
              <span>{p.label}</span>
              <span>{p.value}</span>
            </div>
          ))}
          {!coords && params.length === 0 && (
            <div className="sim-details__row">
              <span>Parameters are not available yet.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SimTile;
