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
  const { panelInterfere, mapPagePosition } = useDirectorFun(direction);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      displayedItem?.initialOpen &&
      !displaySimulationPanel &&
      panelInterfere === 0
    ) {
      onToggle(displayedItem?.key);
      console.log('Initial open for:', displayedItem?.key);
    }

    if (displayedItem?.key === displaySimulationPanel) {
      console.log({ current_DisplayedITEM: displayedItem });
      dispatch(setDisplaySimulationPanel({ direction, value: null }));
    }
  }, [displayedItem?.initialOpen, displaySimulationPanel]);
}
export default useHandleInitialOpen;
