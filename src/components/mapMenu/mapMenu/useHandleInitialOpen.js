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
  const { panelInterfere, mapPagePosition, openItems } = useDirectorFun(direction);

  const dispatch = useDispatch();
  useEffect(() => {
 
    if (
      displayedItem?.initialOpen &&
      !displaySimulationPanel &&
      panelInterfere === 0 &&
      !openItems?.[displayedItem.key]
    ) {
      onToggle(displayedItem?.key);
    }

    if (displayedItem?.key === displaySimulationPanel) {
      dispatch(setDisplaySimulationPanel({ direction, value: null }));
    }
  }, [displayedItem?.initialOpen, displaySimulationPanel]);
}
export default useHandleInitialOpen;
