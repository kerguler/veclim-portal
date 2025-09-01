// import './SimTile.css';
// import { ReactComponent as DeleteIcon } from 'assets/icons/django/delete-icon.svg';
// import { ReactComponent as ViewIcon } from 'assets/icons/django/eye-icon.svg';
// import { useDeleteSimulationMutation, useEditSimulationMutation } from 'store';
// import SimDate from './SimDate';
// import { useEffect } from 'react';
// import { setEditedSimulation } from 'store';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setBlinkers } from 'store';
// import 'components/Tooltip/tooltip.css';
// import { useLazyGetSimulationListQuery } from 'store';
// import StatusIndicator from './StatusIndicator';
// import { setDataArrived } from 'store';
// import simTileHelpers from './simTileHelpers';
// import { useAlboData } from 'context/AlboDataContext';
// import { setInvalidateSimData } from 'store';
// import useSimTileFunctions from './useSimTileFunctions';
// import { setDisplaySimulationPanel } from 'store';
// import useDirectorFun from 'customHooks/useDirectorFun';
// import { setShimmered } from 'store';
// import Tooltip from 'components/Tooltip/Tooltip';

// function SimTile({ sim, direction, shimmerList }) {
//   const [returnResults, setReturnResults] = useState(false);

//   const [
//     triggerFetch,
//     { data: dataToView, isFetching: isSimFetching, error: refetchError },
//   ] = useLazyGetSimulationListQuery();
//   const dispatch = useDispatch();
//   const [deleteSimulation] = useDeleteSimulationMutation();

//   const simulationList = useSelector((state) => state.simulation.simList);
//   const [displayIcon, setDisplayIcon] = useState(null);

//   const { setSimResult, setDataSim, setIsLoadingSim } = useAlboData();

//   const { simRecord, isAlboChik, displayViewIcon } = useSimTileFunctions(sim);

//   const handleDeleteSimulation = (id) => {
//     simTileHelpers.handleDeleteSimulation(deleteSimulation, id);
//   };

//   const handleDownload = async (id) => {
//     try {
//       const payload = await triggerFetch({ id, return_results: true }).unwrap();
//       // Some APIs return { results: ... }, others return the data directly:
//       const results = payload?.results ?? payload;

//       console.log('download payload:', payload);
//       simTileHelpers.handleDownload(payload);
//     } catch (e) {
//       console.error('Failed to download results:', e);
//     }
//   };

//   const levelData = useSelector((state) => state.mapMenu.left.panelLevel);
//   // useEffect(() => {
//   //   dispatch(setDisplaySimulationPanel({ direction: direction, value: null }));
//   // }, []);

//   const handleViewSimulationResults = async (id) => {
//     dispatch(setShimmered({ direction, value: shimmerList }));
//     try {
//       const { results } = await triggerFetch({
//         id,
//         return_results: true,
//       }).unwrap();
//       simTileHelpers.handleViewSimulationResults(
//         results,
//         setSimResult,
//         dispatch,
//         direction,
//         levelData,
//         setReturnResults
//       );
//     } catch (err) {
//       console.error('Failed to load simulation results:', err);
//     } finally {
//       setIsLoadingSim(false);
//     }
//   };

//   return (
//     <div
//       onClick={() => setDisplayIcon(true)}
//       onMouseEnter={() => setDisplayIcon(true)}
//       onMouseLeave={() => setDisplayIcon(false)}
//       key={sim.id}
//       className="sim-list-item float-bg2"
//     >
//       <div className="tile-entry ">
//         <p>Id: </p>
//         <p>{sim.id}</p>
//         <SimDate sim={sim}></SimDate>
//       </div>{' '}
//       <div className="icon-area ">
//         {displayIcon && isAlboChik && displayViewIcon && (
//           <Tooltip label="view results" placement="top">
//             <div onClick={() => handleViewSimulationResults(sim.id)}>
//               <ViewIcon className=" sim-icon icon-img" />
//             </div>
//           </Tooltip>
//         )}
//         <StatusIndicator
//           status={simRecord?.status || sim.status}
//           setDownloadResult={() => handleDownload(sim.id)}
//         />

//         {displayIcon && (
//           <Tooltip label="delete" placement="top">
//             <div onClick={() => handleDeleteSimulation(sim.id)}>
//               <DeleteIcon className="sim-icon icon-img" />
//             </div>
//           </Tooltip>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SimTile;
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
import Tooltip from 'components/Tooltip/Tooltip';

function SimTile({ sim, direction, shimmerList }) {
  const dispatch = useDispatch();

  const [displayIcon, setDisplayIcon] = useState(false);

  const [deleteSimulation] = useDeleteSimulationMutation();
  const [triggerFetch] = useLazyGetSimulationListQuery();

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
            isAlboChik && displayViewIcon && displayIcon ? '' : 'hidden-keep-space'
          }`}
        >
          <Tooltip label="view results" placement="top">
            <button
              type="button"
              className="icon-btn"
              onClick={() => handleViewSimulationResults(sim.id)}
              aria-label="View results"
            >
              <ViewIcon className="sim-icon icon-img" />
            </button>
          </Tooltip>
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
          <Tooltip label="delete" placement="top">
            <button
              type="button"
              className="icon-btn"
              onClick={() => handleDeleteSimulation(sim.id)}
              aria-label="Delete simulation"
            >
              <DeleteIcon className="sim-icon icon-img" />
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

export default SimTile;
