import useDirectorFun from 'customHooks/useDirectorFun';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setDisplaySimulationPanel } from 'store';
function useHandleInitialOpen(
  displayedItem,
  onToggle,
  direction,
  displaySimulationPanel,
  lastDisplayedPanel
) {
  const { panelInterfere } = useDirectorFun(direction);

  const dispatch = useDispatch();
  useEffect(() => {
    if (displayedItem?.initialOpen && !displaySimulationPanel && panelInterfere == 0) {
      onToggle(displayedItem.key);
    }

    if (displayedItem.key === displaySimulationPanel) {
      console.log('SET simulation panel NULL');
      dispatch(setDisplaySimulationPanel({ direction, value: null }));
    }
  }, [displayedItem.initialOpen, displaySimulationPanel]);
}
export default useHandleInitialOpen;
