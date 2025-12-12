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
} from 'store';

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
      dispatch(setDataArrived({ direction: direction, value: false }));
      setDataSim(null);
      setSimResult(null);
    }
  }, [invalidateSimData]);
  useEffect(() => {
    if (displaySimulationPanel) {
      handleToggle(displaySimulationPanel);
    }
  }, [displaySimulationPanel]);
  useEffect(() => {
    if (
      lastPanelDisplayed &&
      panelInterfere === -1 &&
      displaySimulationPanel === null
    ) {
      handleToggle(lastPanelDisplayed);
    }
  }, [panelInterfere, lastPanelDisplayed, twinIndex]);

  function handleToggle(clickedKey) {
    if (siblingCount === 1) {
      dispatch(setTwinIndex({ direction, value: 0 }));
    }
    let tempOpenItems = { ...openItems };
    let desiredParent = menuStructure.filter(
      (item) => item.key === clickedKey
    )[0].parent;
    if (desiredParent === parent) {
      dispatch(
        setInterferePanelStyle({ direction, value: { animation: 'none' } })
      );
    } else {
      setParent(desiredParent);
    }

    const findParents = (key) => {
      let dataInStructure = menuStructure.filter((item) => item.key === key);
      return dataInStructure[0].parent;
    };

    let parentKey = findParents(clickedKey);
    let openItemsTemp = {};

    while (parentKey !== null) {
      openItemsTemp[parentKey] = true;
      parentKey = findParents(parentKey);
    }
    if (!openItems[clickedKey]) {
      openItemsTemp[clickedKey] = true;
      // dispatch(setDisplaySimulationPanel({ direction, value: null }));
    } else {
      delete openItemsTemp[clickedKey];
      let currentPanel = panelData.filter(
        (panel) => panel.key === clickedKey
      )[0];
      if (currentPanel.selfClose) {
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
