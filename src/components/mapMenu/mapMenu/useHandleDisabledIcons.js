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
      const myPanel = panelData.find(
        (panelItem) => panelItem.key === panel.key
      );
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
        pointerEvents: 'none',
        cursor: 'not-allowed',

        opacity: 0.45,
        filter: 'grayscale(60%)',

        backdropFilter: 'blur(4px)', // modern glass feel
        backgroundColor: 'rgba(255,255,255,0.03)',

        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.2s ease',
        // display: 'none'
      };
    }

    return {
      pointerEvents: 'all',
      opacity: 1,
      filter: 'none',
      transition: 'all 0.2s ease',
    };
  }, [shouldDisable]);

  const imgStyle = useMemo(() => {
    return shouldDisable
      ? {
          opacity: 0.5,
          transform: 'scale(0.95)',
        }
      : {
          opacity: 1,
          transform: 'scale(1)',
        };
  }, [shouldDisable]);

  return { style, imgStyle, shouldDisable };
}

export default useHandleDisabledIcons;
