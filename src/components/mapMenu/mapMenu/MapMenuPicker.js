import useDirectorFun from 'customHooks/useDirectorFun';
import React, { useEffect, useState } from 'react';
import MapMenuV2 from './MapMenuV2';
import classNames from 'classnames';
import MenuList from './MenuList';
import { useDispatch } from 'react-redux';
import { useAlboData } from 'context/AlboDataContext';
import {
  setInterferePanelStyle,
  setDataArrived,
  setTwinIndex,
  setPanelLevel,
  setPanelInterfere,
} from 'store';
import { setPanelOpen } from 'store';

export default function MapMenuPicker({ direction }) {
  const {
    menuStructure,
    openItems,
    setOpenItems,
    panelLevelLeft: levelData,
    panelData,
    tree,
    invalidateSimData,
    displaySimulationPanel,
    lastPanelDisplayed,
    mapPagePosition,
    panelInterfere,
    directInit,
    twinIndex,
    siblingCount,
  } = useDirectorFun('left');

  const dispatch = useDispatch();
  let className = classNames('icon');

  const { setDataSim, simResult, setSimResult } = useAlboData();
  const [parent, setParent] = useState(null);

  useEffect(() => {
    if (invalidateSimData) {
      dispatch(setDataArrived({ direction, value: false }));
      setDataSim(null);
      setSimResult(null);
    }
  }, [invalidateSimData, dispatch, direction, setDataSim, setSimResult]);

  useEffect(() => {
    if (displaySimulationPanel) {
      handleToggle(displaySimulationPanel);
    }
  }, [displaySimulationPanel]);

  useEffect(() => {
    if (
      mapPagePosition?.lat !== null &&
      lastPanelDisplayed &&
      panelInterfere === -1 &&
      displaySimulationPanel === null
    ) {
      handleToggle(lastPanelDisplayed);
    
      dispatch(setPanelInterfere({ direction, value: 0 }));
    }
  }, [
    panelInterfere,
    lastPanelDisplayed,
    twinIndex,
    mapPagePosition?.lat,
    displaySimulationPanel,
  ]);

  useEffect(() => {
    if (mapPagePosition?.lat !== null) return;

    const nextOpenItems = { ...openItems };
    let changed = false;

    const topLevelKeys = new Set((tree || []).map((item) => item.key));

    const findMenuItem = (key) =>
      menuStructure.find((item) => item.key === key);

    // an empty chartParameters: {} is truthy but not real chart data
    const isPositionDependentPanel = (panel) =>
      panel?.positionDependent ||
      (!!panel?.chartParameters && Object.keys(panel.chartParameters).length > 0);

    Object.keys(openItems).forEach((key) => {
      const panel = panelData.find((item) => item.key === key);
      if (!panel) return;

      if (isPositionDependentPanel(panel)) {
        if (nextOpenItems[key]) {
          delete nextOpenItems[key];
          changed = true;
        }

        let parentKey = findMenuItem(key)?.parent;

        while (parentKey && !topLevelKeys.has(parentKey)) {
          if (nextOpenItems[parentKey]) {
            delete nextOpenItems[parentKey];
            changed = true;
          }
          parentKey = findMenuItem(parentKey)?.parent;
        }
      }
    });

    if (!changed) {
      dispatch(setPanelOpen({ direction, value: false }));
      return;
    }

    dispatch(setOpenItems(nextOpenItems));
    dispatch(
      setPanelLevel({
        ...levelData,
        level: Object.keys(nextOpenItems).length,
      })
    );
    dispatch(setPanelOpen({ direction, value: false }));
  }, [mapPagePosition?.lat]);
  function handleToggle(clickedKey) {
    if (siblingCount === 1) {
      dispatch(setTwinIndex({ direction, value: 0 }));
    }

    let desiredParent = menuStructure.filter(
      (item) => item.key === clickedKey
    )[0]?.parent;

    if (desiredParent === parent) {
      dispatch(
        setInterferePanelStyle({ direction, value: { animation: 'none' } })
      );
    } else {
      setParent(desiredParent);
    }

    const findParents = (key) => {
      let dataInStructure = menuStructure.filter((item) => item.key === key);
      return dataInStructure[0]?.parent ?? null;
    };

    let parentKey = findParents(clickedKey);
    let openItemsTemp = {};

    while (parentKey !== null) {
      openItemsTemp[parentKey] = true;
      parentKey = findParents(parentKey);
    }

    if (!openItems[clickedKey]) {
      const clickedPanel = panelData.find((panel) => panel.key === clickedKey);
      // check child panels too, not just the clicked item's own entry
      // (e.g. 'activity_forecast' only has chartParameters on its
      // 'activity_forecast_panel' child)
      const hasRealChartParameters = (panel) =>
        !!panel?.chartParameters && Object.keys(panel.chartParameters).length > 0;

      const childPanelKeys = menuStructure
        .filter((item) => item.parent === clickedKey && item.key.endsWith('_panel'))
        .map((item) => item.key);
      const childIsPositionDependent = childPanelKeys.some((key) => {
        const panel = panelData.find((p) => p.key === key);
        return panel?.positionDependent || hasRealChartParameters(panel);
      });
      const isPositionDependent =
        clickedPanel?.positionDependent ||
        hasRealChartParameters(clickedPanel) ||
        childIsPositionDependent;

      if (!(isPositionDependent && mapPagePosition?.lat === null)) {
        openItemsTemp[clickedKey] = true;
      }
    } else {
      delete openItemsTemp[clickedKey];
      let currentPanel = panelData.filter(
        (panel) => panel.key === clickedKey
      )[0];
      if (currentPanel?.selfClose) {
        delete openItemsTemp[findParents(clickedKey)];
      }
    }

    dispatch(
      setPanelLevel({
        ...levelData,
        level: Object.keys(openItemsTemp).length,
      })
    );
    dispatch(setOpenItems(openItemsTemp));

    let sCount = menuStructure.filter(
      (item) => item.key.includes('_panel') && item.parent === clickedKey
    ).length;

    if (sCount === 1 && twinIndex > 0) {
      dispatch(setTwinIndex({ direction, value: 0 }));
    }
  }

  if (!tree || !tree.length) return null;

  const itemKey = tree[0].key;
  const menuDirection = '';

  return (
    <MapMenuV2 menuDirection={menuDirection} level={0}>
      <MenuList items={tree} onToggle={handleToggle} direction={direction} />
    </MapMenuV2>
  );
}

// import useDirectorFun from 'customHooks/useDirectorFun';
// import React, { useEffect, useState } from 'react';
// import MapMenuV2 from './MapMenuV2';
// import classNames from 'classnames';
// import MenuList from './MenuList';
// import { useDispatch } from 'react-redux';
// import { useAlboData } from 'context/AlboDataContext';
// import {
//   setInterferePanelStyle,
//   setDataArrived,
//   setTwinIndex,
//   setPanelLevel,
// } from 'store';
// import { setPanelOpen } from 'store';

// export default function MapMenuPicker({ direction }) {
//   const {
//     menuStructure,
//     openItems,
//     setOpenItems,
//     panelLevelLeft: levelData,
//     panelData,
//     tree,
//     invalidateSimData,
//     displaySimulationPanel,
//     lastPanelDisplayed,
//     mapPagePosition,
//     panelInterfere,
//     directInit,
//     twinIndex,
//     siblingCount,
//   } = useDirectorFun('left');
//   const dispatch = useDispatch();
//   let className = classNames('icon');

//   useEffect(() => {
//     if (mapPagePosition?.lat !== null) return;

//     const nextOpenItems = { ...openItems };

//     Object.keys(openItems).forEach((key) => {
//       const panel = panelData.find((item) => item.key === key);

//       if (panel?.positionDependent) {
//         delete nextOpenItems[key];

//         if (panel.selfClose && panel.parent) {
//           delete nextOpenItems[panel.parent];
//         }
//       }
//     });

//     dispatch(setOpenItems(nextOpenItems));
//     dispatch(
//       setPanelLevel({
//         ...levelData,
//         level: Object.keys(nextOpenItems).length,
//       })
//     );

//     if (Object.keys(nextOpenItems).length === 0) {
//       dispatch(setPanelOpen({ direction, value: false }));
//     }
//   }, [
//     mapPagePosition?.lat,
//     openItems,
//     panelData,
//     dispatch,
//     levelData,
//     direction,
//   ]);

//   const { setDataSim, simResult, setSimResult } = useAlboData();
//   const [parent, setParent] = useState(null);
//   useEffect(() => {
//     if (invalidateSimData) {
//       dispatch(setDataArrived({ direction: direction, value: false }));
//       setDataSim(null);
//       setSimResult(null);
//     }
//   }, [invalidateSimData]);
//   useEffect(() => {
//     if (displaySimulationPanel) {
//       handleToggle(displaySimulationPanel);
//     }
//   }, [displaySimulationPanel]);
//   useEffect(() => {
//     if (
//       lastPanelDisplayed &&
//       panelInterfere === -1 &&
//       displaySimulationPanel === null
//     ) {
//       handleToggle(lastPanelDisplayed);
//     }
//   }, [panelInterfere, lastPanelDisplayed, twinIndex]);

//   function handleToggle(clickedKey) {
//     if (siblingCount === 1) {
//       dispatch(setTwinIndex({ direction, value: 0 }));
//     }
//     let tempOpenItems = { ...openItems };
//     let desiredParent = menuStructure.filter(
//       (item) => item.key === clickedKey
//     )[0].parent;
//     if (desiredParent === parent) {
//       dispatch(
//         setInterferePanelStyle({ direction, value: { animation: 'none' } })
//       );
//     } else {
//       setParent(desiredParent);
//     }

//     const findParents = (key) => {
//       let dataInStructure = menuStructure.filter((item) => item.key === key);
//       return dataInStructure[0].parent;
//     };

//     let parentKey = findParents(clickedKey);
//     let openItemsTemp = {};

//     while (parentKey !== null) {
//       openItemsTemp[parentKey] = true;
//       parentKey = findParents(parentKey);
//     }
//     if (!openItems[clickedKey]) {
//       openItemsTemp[clickedKey] = true;

//       // dispatch(setDisplaySimulationPanel({ direction, value: null }));
//     } else {
//       delete openItemsTemp[clickedKey];
//       let currentPanel = panelData.filter(
//         (panel) => panel.key === clickedKey
//       )[0];
//       if (currentPanel.selfClose) {
//         delete openItemsTemp[findParents(clickedKey)];
//       }
//     }
//     // if (mapPagePosition.lat === null) {
//     //   delete openItemsTemp[clickedKey];
//     //   let currentPanel = panelData.filter(
//     //     (panel) => panel.key === clickedKey
//     //   )[0];
//     //   if (currentPanel.selfClose) {
//     //     delete openItemsTemp[findParents(clickedKey)];
//     //   }
//     //   return;
//     // }
//     dispatch(
//       setPanelLevel({
//         ...levelData,
//         level: Object.keys(openItemsTemp).length,
//       })
//     );
//     dispatch(setOpenItems(openItemsTemp));
//     let sCount = menuStructure.filter(
//       (item) => item.key.includes('_panel') && item.parent === clickedKey
//     ).length;
//     if (sCount === 1 && twinIndex > 0) {
//       dispatch(setTwinIndex({ direction, value: 0 }));
//     }
//   }

//   if (!tree || !tree.length) return null;
//   const itemKey = tree[0].key;
//   const menuDirection = '';
//   return (
//     <MapMenuV2 menuDirection={menuDirection} level={0}>
//       <MenuList items={tree} onToggle={handleToggle} direction={direction} />
//     </MapMenuV2>
//   );
// }
