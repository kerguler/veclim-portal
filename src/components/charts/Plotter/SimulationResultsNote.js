import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAlboData } from 'context/AlboDataContext';
import {
  setDisplaySimulationPanel,
  setTwinIndex,
} from 'store';
import {
  describeSimulationParams,
  getSimulationCoordinates,
} from 'components/SimulationList/SimulationTiles/SimTile/simParams';
import './SimulationResultsNote.css';

function SimulationResultsNote() {
  const { simMeta } = useAlboData();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [simMeta?.id]);

  const openListPanel = () => {
    const direction = 'left';
    dispatch(setDisplaySimulationPanel({ direction, value: null }));
    setTimeout(() => {
      dispatch(
        setDisplaySimulationPanel({ direction, value: 'simulation_adjustment' })
      );
      dispatch(setTwinIndex({ direction, value: 1 }));
    }, 0);
  };

  const listLink = (
    <button type="button" className="sim-note__link" onClick={openListPanel}>
      List Panel
    </button>
  );

  if (!simMeta?.id) {
    return (
      <>
        Results of your simulation appear here. To see an earlier run, open the{' '}
        {listLink} and choose View results.
      </>
    );
  }

  const coords = getSimulationCoordinates(simMeta.model_data);
  const params = describeSimulationParams(simMeta.model_data);

  return (
    <>
      Results of your simulation Id:{' '}
      <span className="sim-note" ref={rootRef}>
        <button
          type="button"
          className="sim-note__id"
          aria-expanded={open}
          title="Show simulation parameters"
          onClick={() => setOpen((v) => !v)}
        >
          {simMeta.id}
        </button>
        {open && (
          <span className="sim-note__popover" role="dialog">
            {coords && (
              <Fragment>
                <span>Latitude</span>
                <span>{coords.lat.toFixed(2)}</span>
                <span>Longitude</span>
                <span>{coords.lng.toFixed(2)}</span>
              </Fragment>
            )}
            {params.map((p) => (
              <Fragment key={p.label}>
                <span>{p.label}</span>
                <span>{p.value}</span>
              </Fragment>
            ))}
          </span>
        )}
      </span>
      . To see an earlier run, open the {listLink} and choose View results.
    </>
  );
}

export default SimulationResultsNote;
