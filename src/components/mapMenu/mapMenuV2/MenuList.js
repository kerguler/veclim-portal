import MenuItemV2 from './MenuItemV2';
import useDirectorFun from 'customHooks/useDirectorFun';
import classNames from 'classnames';
import { useAlboData } from 'context/AlboDataContext';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { timeSeriesApi } from 'store/apis/timeSeriesApi_new';
import { useDispatch } from 'react-redux';
import { setDisplaySimulationPanel } from 'store';
import { setShimmered } from 'store';

function MenuList({ items, onToggle, iconClassName, direction }) {
  const dispatch = useDispatch();
  const {
    openItems,
    setOpenItems,
    dataArrived,
    menuStructure,
    simulationPanels,
    invalidateSimData,
  } = useDirectorFun('left');
  const { dataSim } = useAlboData();
  const vectorName = useSelector((state) => state.fetcher.fetcherStates.vectorName);
  if (!items || items.length === 0) return null;

  let shouldShimmer = Object.keys(openItems).length === 0 ? true : false;
  let shimmerList = {};

  return items.map((item) => {
    let siblingKeys = items.filter((i) => i.key !== item.key).map((i) => i.key);
    if (dataArrived && !invalidateSimData && dataSim && vectorName !== 'papatasi') {
      let parents = [];
      const findParents = (key) => {
        let parent = menuStructure.filter((item) => item.key === key)[0].parent;
        return parent;
      };
      simulationPanels.forEach((panel) => {
        const parentChain = [];
        let current = findParents(panel.key);
        while (current !== null) {
          parentChain.push(current);
          current = findParents(current);
        }
        parents.push(...parentChain);
      });

      if (parents.includes(item.key)) {
        shouldShimmer = true;
      } else {
        shouldShimmer = false;
      }
    }

    return (
      <MenuItemV2
        shouldShimmer={shouldShimmer}
        // iconClassName={className}
        shimmerList={shimmerList}
        key={item.key}
        item={item}
        openItems={openItems}
        onToggle={(clickedKey) => {
          return onToggle(clickedKey, siblingKeys);
        }}
        direction={direction}
      />
    );
  });
}

export default MenuList;
