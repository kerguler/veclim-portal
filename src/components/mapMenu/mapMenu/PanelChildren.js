import RenderedPanelV2 from 'components/panel/SwitcherV2/RenderedPanelV2';
import useDirectorFun from 'customHooks/useDirectorFun';
import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { setChartParameters } from 'store';
import { setGraphType } from 'store';
import { setLastPanelDisplayed, setPanelOpen } from '../menuStore/mapMenuSlice';
import { setSiblingCount } from 'store';
import { setTwinIndex } from 'store';
import { Tab } from 'material-ui';
import { TabView } from 'components/TabView/TabView';
function PanelChildren({ displayedItem, level, direction }) {
  const dispatch = useDispatch();
  const {
    openItems,
    panelData,
    dataArrived,
    menuStructure,
    twinIndex,
    setOpenItems,
    mapPagePosition,
    interferePanelStyleRight: interferePanelStyle,
    lastPanelDisplayed,
    panelOpen,
    persistPointer,
    siblingCount,
  } = useDirectorFun(direction);
  const panelRef = useRef(null);
  let p = panelRef.current;
  const safeDisplayedItem = displayedItem || {};

  const panelChildren = menuStructure.filter((child) => {
    if (child.parent === safeDisplayedItem.key) {
      const desiredPanel = panelData.filter(
        (panel) => panel.key === child.key
      )[0];
      // we will use this logic later on
      if (desiredPanel?.simulation && !dataArrived) {
      } else if (desiredPanel?.simulation && dataArrived) {
        return child;
      } else {
        return child;
      }
    }
  });

  const safeTwinIndex =
    panelChildren.length === 0
      ? 0
      : Math.min(twinIndex, panelChildren.length - 1);

  useEffect(() => {
    const parents = menuStructure
      .map((menuItem) => {
        if (menuItem.key === safeDisplayedItem.key) {
          return menuItem.parent;
        }
      })
      .filter((value) => value !== null && value !== undefined);
    panelRef.current = parents;
  });

  useEffect(() => {
    if (panelChildren && panelChildren[safeTwinIndex]) {
      let panel = panelData.filter(
        (panel) => panel.key === panelChildren[safeTwinIndex].key
      )[0];

      if (
        panel.chartParameters &&
        Object.keys(panel.chartParameters).length > 0
      ) {
        if (mapPagePosition.lat === null) {
          const tempOpenItems = { ...openItems };
          delete tempOpenItems[safeDisplayedItem.key];
          dispatch(setOpenItems(tempOpenItems));
        }
      }

      if (
        panelData.filter(
          (panel) => panel.key === panelChildren[safeTwinIndex].key
        )[0].simulation
      ) {
        dispatch(setGraphType('sim'));
      } else {
        dispatch(setGraphType('ts'));
        twinIndex > panelChildren.length &&
          dispatch(setTwinIndex({ direction, value: 0 }));
      }
    }
  }, [
    dispatch,
    safeDisplayedItem.key,
    mapPagePosition.lat,
    openItems,
    panelChildren,
    panelData,
    setOpenItems,
    safeTwinIndex,
  ]);

  useEffect(() => {
    const posDependence = panelData.filter(
      (panel) => panel.key === safeDisplayedItem.key
    )[0]?.positionDependent;
    if (mapPagePosition.lat === null && posDependence) {
      const tempOpenItems = { ...openItems };
      delete tempOpenItems[safeDisplayedItem.key];
      dispatch(setOpenItems(tempOpenItems));
    }
  });

  useEffect(() => {
    dispatch(setSiblingCount({ direction, value: panelChildren.length }));

    // Clamp twinIndex if it's out of bounds
    if (twinIndex >= panelChildren.length) {
      dispatch(setTwinIndex({ direction, value: 0 }));
    }
  }, [panelChildren.length, twinIndex]);

  useEffect(() => {
    if (panelChildren.length === 1) {
      twinIndex > 0 && dispatch(setTwinIndex({ direction, value: 0 }));
    }
  }, [panelChildren.length]);

  const displayedPanel =
    panelChildren?.length > 1 ? panelChildren[safeTwinIndex] : panelChildren[0];
  const safeDisplayedPanel = displayedPanel || {};

  useEffect(() => {
    const activePanelChild = panelChildren[safeTwinIndex];
    if (persistPointer) return;
    if (!activePanelChild) return;

    let forgetOpen = panelData.find(
      (panel) => panel.key === safeDisplayedPanel.key
    )?.forgetOpen;

    dispatch(setPanelOpen({ direction, value: true }));

    if (lastPanelDisplayed !== safeDisplayedPanel.key && !forgetOpen) {
      dispatch(
        setLastPanelDisplayed({
          direction: 'left',
          value: activePanelChild.key,
        })
      );
    }
  }, [
    safeDisplayedPanel,
    lastPanelDisplayed,
    mapPagePosition,
    safeTwinIndex,
    panelChildren,
    panelData,
  ]);
  // const displayedPanelDetails = panelData.filter(
  //   (panel) => panel.key === safeDisplayedPanel.key
  // )[0];
  const displayedPanelDetails = panelData.find(
    (panel) => panel.key === safeDisplayedPanel.key
  );

  const content = displayedPanelDetails?.content;

  const chartParameters = displayedPanelDetails?.chartParameters || {};

  useEffect(() => {
    dispatch(
      setChartParameters({
        direction,
        value: chartParameters,
      })
    );
  }, [displayedPanelDetails]);

  if (!safeDisplayedItem || !displayedPanelDetails) return null;

  return (
    <RenderedPanelV2
      panelChildren={panelChildren}
      siblingCount={siblingCount}
      direction="left"
      panelClassName={'no-anim'}
      panel={content}
      level={level}
      passedKey={panelChildren[safeTwinIndex]}
      panelChart={
        chartParameters && Object.keys(chartParameters).length > 0
          ? true
          : false
      }
    />
  );
}

export default PanelChildren;
