import { useGetSimulationListQuery } from 'store';
import './SimulationList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SimulationEditPanel from './SimulationEditPanel/SimulationEditPanel';
import { setSimList } from 'store';
import SimulationTiles from './SimulationTiles/SimulationTiles';
import { use } from 'react';
import { areArraysIdentical } from './utils/simUtils';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
function SimulationListCurrent({ direction }) {
  const dispatch = useDispatch();
  useCsrf(); // Initialize CSRF token for API requests
  const blinkers = useSelector((state) => state.dashboard.blinkers);
  const simList = useSelector((state) => state.simulation.simList);
  let id = null;
  const {
    data: fetchedSimList,
    isFetching: isSimListFetching,
    error: simListError,
  } = useGetSimulationListQuery({ return_results: false });

  useEffect(() => {
    if (!fetchedSimList) return;
    dispatch(setSimList(fetchedSimList));
  }, [fetchedSimList, dispatch]);

  let renderedSimulationList = null;

  if (fetchedSimList) {
    renderedSimulationList = (
      <SimulationTiles fetchedSimList={fetchedSimList} direction={direction} />
    );
  } else {
    renderedSimulationList = (
      <div>
        <p>somethingg terrible happened</p>
      </div>
    );
  }

  return (
    <div className="simlist-container  ">
      {/* {blinkers.displayEditPage && <SimulationEditPanel />} */}

      <div className="title-simulations ">
        <p>Current Simulations</p>{' '}
      </div>

      <div className="scrollable-list  fixed">{renderedSimulationList}</div>
    </div>
  );
}

export default SimulationListCurrent;
