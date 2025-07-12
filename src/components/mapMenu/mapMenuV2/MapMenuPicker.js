import useDirectorFun from 'customHooks/useDirectorFun';
import React, { useEffect, useRef, useState } from 'react';
import MapMenuV2 from './MapMenuV2';
import classNames from 'classnames';
import RenderedPanelV2 from 'components/panel/SwitcherV2/RenderedPanelV2';
import MenuList from './MenuList';
import { useDispatch, useSelector } from 'react-redux';
import { useAlboData } from 'context/AlboDataContext';
import {
  setDisplaySimulationPanel,
  setInterferePanelStyle,
  setDataArrived,
  setTwinIndex,
  setPanelLevel,
} from 'store';
import { setPanelInterfere } from 'store';
import { setInvalidateSimData } from 'store';
import findDestroyChildren from './findDestroyChildren';
import { setLastPanelDisplayed } from 'store';

export default function MapMenuPicker({ direction }) {
  const {
    menuStructure,
    openItems,
    setOpenItems,
    panelLevelLeft: levelData,
    panelDataDir: panelData,
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
  const [panelClassName, setPanelClassName] = useState('');
  const [shimmerOn, setShimmerOn] = useState(false);
  let className = classNames('icon');
  if (shimmerOn) {
    className = classNames('icon', 'shimmer-on');
  } else {
    className = classNames('icon', 'shimmer-off');
  }
  const { setDataSim, simResult, setSimResult } = useAlboData();
  const [parent, setParent] = useState(null);
  useEffect(() => {
    if (invalidateSimData) {
      dispatch(setDataArrived({ direction: direction, value: false }));
      setDataSim(null);
      setSimResult(null);
    }
  }, [invalidateSimData]);

  // useEffect(() => {
  //   // dispatch(setOpenItems({ menu_icon: true }));
  //   dispatch(setPanelInterfere({ direction, value: 0 }));
  //   // dispatch(setInvalidateSimData(false));
  // }, []);

  useEffect(() => {
    if (displaySimulationPanel) {
      handleToggle(displaySimulationPanel);
    }
  }, [displaySimulationPanel]);
  useEffect(() => {
    if (lastPanelDisplayed && panelInterfere === -1) {
      handleToggle(lastPanelDisplayed);
    }
  }, [panelInterfere, lastPanelDisplayed, twinIndex]);

  const currentParent = useRef(null);
  function handleToggle(clickedKey) {
    if (siblingCount === 1) {
      dispatch(setTwinIndex({ direction, value: 0 }));
    }
    let tempOpenItems = { ...openItems };
    let desiredParent = menuStructure.filter((item) => item.key === clickedKey)[0].parent;
    if (desiredParent === parent) {
      dispatch(setInterferePanelStyle({ direction, value: { animation: 'none' } }));
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
  

      dispatch(setDisplaySimulationPanel({ direction, value: null }));
    } else {
      delete openItemsTemp[clickedKey];
      let currentPanel = panelData.filter((panel) => panel.key === clickedKey)[0];
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
    console.log('siblingCount', sCount);
    if (sCount === 1 && twinIndex > 0) {
      console.log('siblingCount is 1, resetting twinIndex', lastPanelDisplayed);
      dispatch(setTwinIndex({ direction, value: 0 }));
    }
    // console.log('MAPMENU', { siblingCount, sCount, twinIndex, clickedKey });
    console.log(openItemsTemp);
  }

  if (!tree || !tree.length) return null;

  const itemKey = tree[0].key;
  const menuDirection = '';
  return (
    <MapMenuV2  menuDirection={menuDirection} level={0}>
      <MenuList
        items={tree}
        iconClassName={className}
        onToggle={handleToggle}
        direction={direction}
      />
    </MapMenuV2>
  );
}
