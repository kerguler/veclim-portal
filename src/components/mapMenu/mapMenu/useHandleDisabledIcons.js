import useDirectorFun from 'customHooks/useDirectorFun';
import { useMemo } from 'react';

function useHandleDisabledIcons(panelChildren) {
  const { panelData, mapPagePosition } = useDirectorFun('left');

  const hasValidPosition =
    mapPagePosition?.lat !== null &&
    mapPagePosition?.lat !== undefined &&
    mapPagePosition?.lng !== null &&
    mapPagePosition?.lng !== undefined;

  const shouldDisable = useMemo(() => {
    if (hasValidPosition) return false;

    return (panelChildren || []).some((panel) => {
      const myPanel = panelData.find((panelItem) => panelItem.key === panel.key);
      if (!myPanel) return false;

      const hasChartParameters =
        myPanel.chartParameters &&
        Object.keys(myPanel.chartParameters).length > 0;

      return hasChartParameters || myPanel.positionDependent;
    });
  }, [panelChildren, panelData, hasValidPosition]);

  const style = useMemo(() => {
    if (shouldDisable) {
      return {
        backgroundColor: 'var(--neutral-color1)',
        pointerEvents: 'none',
        cursor: 'not-allowed',
      };
    }

    return {
      color: 'white',
      pointerEvents: 'all',
    };
  }, [shouldDisable]);

  const imgStyle = useMemo(() => {
    return {
      color: 'grey',
    };
  }, []);

  return { style, imgStyle, shouldDisable };
}

export default useHandleDisabledIcons;