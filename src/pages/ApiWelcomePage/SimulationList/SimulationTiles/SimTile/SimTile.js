import './SimTile.css';
import { ReactComponent as DeleteIcon } from 'assets/icons/django/delete-icon.svg';
import { ReactComponent as ViewIcon } from 'assets/icons/django/eye-icon.svg';
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

function SimTile({ sim, direction, shimmerList }) {
  const dispatch = useDispatch();

  const [displayIcon, setDisplayIcon] = useState(false);

  const [deleteSimulation] = useDeleteSimulationMutation();
  const [triggerFetch] = useLazyGetSimulationListQuery();
  const setErrorSim = useAlboData().setErrorSim;
  const levelData = useSelector((state) => state.mapMenu.left.panelLevel);

  const { setSimResult, setIsLoadingSim } = useAlboData();
  const { simRecord, isAlboChik, displayViewIcon } = useSimTileFunctions(sim);

  const handleDeleteSimulation = (id) => {
    simTileHelpers.handleDeleteSimulation(deleteSimulation, id);
  };

  const handleDownload = async (id) => {
    try {
      const payload = await triggerFetch({ id, return_results: true }).unwrap();
      const results = payload?.results ?? payload;
      simTileHelpers.handleDownload(results);
    } catch (e) {
      console.error('Failed to download results:', e);
    }
  };

  const handleViewSimulationResults = async (id) => {
    dispatch(setShimmered({ direction, value: shimmerList }));
    try {
      const payload = await triggerFetch({ id, return_results: true }).unwrap();
      const results = payload?.results ?? payload;

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
      <div className="tile-entry">
        <p>Id:&nbsp;</p>
        <p>{sim.id}</p>
        <SimDate sim={sim} />
      </div>

      <div className="icon-area">
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
  );
}

export default SimTile;
