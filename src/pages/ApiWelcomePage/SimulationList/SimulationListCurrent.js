import { useGetSimulationListQuery } from 'store';
import './SimulationList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSimList } from 'store';
import SimulationTiles from './SimulationTiles/SimulationTiles';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
function SimulationListCurrent({ direction }) {
  const dispatch = useDispatch();
  useCsrf(); // Initialize CSRF token for API requests
  const { data: fetchedSimList } = useGetSimulationListQuery({
    return_results: false,
  });

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
        <p>Waiting for data</p>
      </div>
    );
  }

  return (
    <div className="simlist-container  ">
      <div className="title-simulations ">
        <p>Current Simulations</p>{' '}
      </div>

      <div className="scrollable-list  fixed">{renderedSimulationList}</div>
    </div>
  );
}

export default SimulationListCurrent;
