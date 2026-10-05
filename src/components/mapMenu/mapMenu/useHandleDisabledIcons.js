import useDirectorFun from 'customHooks/useDirectorFun';
import { O } from 'jsoneditor/dist/jsoneditor-minimalist';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOpenItems } from 'store';
import useIsStaff from 'customHooks/useIsStaff';

function useHandleDisabledIcons(panelChildren, rotateDeg = 0) {
  const { panelData, menuStructure, mapPagePosition, openItems } = useDirectorFun('left');
  const dispatch = useDispatch();
  
  const { isLoggedIn } = useIsStaff();
  const hasValidPosition =
    mapPagePosition?.lat !== null &&
    mapPagePosition?.lat !== undefined &&
    mapPagePosition?.lng !== null &&
    mapPagePosition?.lng !== undefined;

  const positionDependentPanelKeys = useMemo(() => {
    return (panelChildren || [])
      .map((panel) => {
        const myPanel = panelData.find(
          (panelItem) => panelItem.key === panel.key
        );

        if (!myPanel) return null;

        const hasChartParameters =
          myPanel.chartParameters &&
          Object.keys(myPanel.chartParameters).length > 0;

        if (hasChartParameters || myPanel.positionDependent) {
          return panel.key;
        }

        return null;
      })
      .filter(Boolean);
  }, [panelChildren, panelData]);

  const shouldDisable = useMemo(() => {
    return (panelChildren || []).some((panel) => {
      const myPanel = panelData.find(
        (panelItem) => panelItem.key === panel.key
      );
      if (!myPanel) return false;

      if (myPanel.requiresAuth && !isLoggedIn) return true;

      if (hasValidPosition) return false;

      const hasChartParameters =
        myPanel.chartParameters &&
        Object.keys(myPanel.chartParameters).length > 0;

      return hasChartParameters || myPanel.positionDependent;
    });
  }, [panelChildren, panelData, hasValidPosition, isLoggedIn]);


  const disabledReason = useMemo(() => {
    if (!shouldDisable) return null;

    const needsAuth = (panelChildren || []).some((panel) => {
      const myPanel = panelData.find((p) => p.key === panel.key);
      return myPanel?.requiresAuth && !isLoggedIn;
    });
    if (needsAuth) return 'auth';

    return 'position';
  }, [shouldDisable, panelChildren, panelData, isLoggedIn]);

  const disabledTooltip = useMemo(() => {
    if (disabledReason === 'auth') {
      return 'You need to log in to access this panel';
    }
    if (disabledReason === 'position') {
      return 'Select a location on the map to access this panel';
    }
    return undefined;
  }, [disabledReason]);

  const style = useMemo(() => {
    if (shouldDisable) {
      return {

        position: 'relative',
        cursor: 'not-allowed',

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

    const isMobile = window.matchMedia('(max-width: 499px)').matches;
    const rotate = rotateDeg && !isMobile ? `rotate(${rotateDeg}deg) ` : '';
    return shouldDisable
      ? {
          opacity: 0.5,
          filter: 'grayscale(60%)',
          transform: `${rotate}scale(0.95)`,
        }
      : {
          opacity: 1,
          filter: 'none',
          transform: `${rotate}scale(1)`,
        };
  }, [shouldDisable, rotateDeg]);
const positionDependentOpenItemKeys = useMemo(() => {
  return (panelChildren || [])
    .map((panel) => {
      const myPanel = panelData.find((p) => p.key === panel.key);
      if (!myPanel) return null;

      const requiresAuthAndLoggedOut = myPanel.requiresAuth && !isLoggedIn;

      const hasChartParameters =
        myPanel.chartParameters &&
        Object.keys(myPanel.chartParameters).length > 0;

      const isPositionDependent =
        hasChartParameters || myPanel.positionDependent;

      if (!isPositionDependent && !requiresAuthAndLoggedOut) return null;

      // Important: close the parent menu item, not the panel key
      const menuItem = menuStructure.find((m) => m.key === panel.key);

      return menuItem?.parent || panel.parent || null;
    })
    .filter(Boolean);
}, [panelChildren, panelData, menuStructure, isLoggedIn]);
 useEffect(() => {
  if (!shouldDisable) return;
  if (!openItems) return;

  const nextOpenItems = { ...openItems };
  let changed = false;

  positionDependentOpenItemKeys.forEach((key) => {
    if (key in nextOpenItems) {
      delete nextOpenItems[key];
      changed = true;
    }
  });

  if (!changed) return;

  dispatch(setOpenItems(nextOpenItems));
}, [shouldDisable, openItems, positionDependentOpenItemKeys, dispatch]);
  return { style, imgStyle, shouldDisable, disabledTooltip };
}

export default useHandleDisabledIcons;
