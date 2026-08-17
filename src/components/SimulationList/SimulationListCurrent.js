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
  const { data: fetchedSimList,isLoading, isFetching, error, refetch } = useGetSimulationListQuery({
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
  }   else if (error) {
    renderedSimulationList = (
      <div className="simlist-error">
        <p>Couldn't load your simulations. Check your connection.</p>
        <button type="button" className="simlist-retry" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  } else if (isLoading || isFetching) {
    renderedSimulationList = (
      <div><p>Loading simulations…</p></div>
    );
 
  } else {
    renderedSimulationList = (
      <div>
        <p>No simulations yet.</p>
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
