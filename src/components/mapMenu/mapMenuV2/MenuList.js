import MenuItemV2 from './MenuItemV2';
import useDirectorFun from 'customHooks/useDirectorFun';
import classNames from 'classnames';
import { useAlboData } from 'context/AlboDataContext';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { timeSeriesApi } from 'store/apis/timeSeriesApi_new';
import { useDispatch } from 'react-redux';
import { setShimmered } from 'store';
function MenuList({ items, onToggle, direction }) {
  const dispatch = useDispatch();
  const {
    openItems,
    setOpenItems,
    dataArrived,
    menuStructure,
    simulationPanels,
    invalidateSimData,
    lastPanelDisplayed,
  } = useDirectorFun('left');
  const [shouldShimmer, setShouldShimmer] = useState(false);

  const { dataSim } = useAlboData();
  useEffect(() => {
    if (Object.keys(openItems).length === 0) {

      setShouldShimmer(true);
      dispatch(setShimmered({ direction, value: { menu_icon: true } }));
    } else {
      setShouldShimmer(false);
    }
  }, [openItems]);

  const vectorName = useSelector((state) => state.fetcher.fetcherStates.vectorName);
  if (!items || items.length === 0) return null;

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
      setShouldShimmer(parents.includes(item.key) ? true : false);
    }

    return (
      <MenuItemV2
        shouldShimmer={shouldShimmer}
        // iconClassName={className}
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
