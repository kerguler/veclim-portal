import useDirectorFun from 'customHooks/useDirectorFun';
import classNames from 'classnames';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setDisplaySimulationPanel } from 'store';
import { setShimmered } from 'store';
import { useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import useWindowSize from 'customHooks/useWindowSize';
import { useSelector } from 'react-redux';
import useHandleInitialOpen from './useHandleInitialOpen';
import useSetIconActive from './useSetIconActive';
import useHandleIconShimmer from './useHandleIconShimmer';
import useHandleDisabledIcons from './useHandleDisabledIcons';
import { setPanelInterfere } from 'store';
import { setTwinIndex } from 'store';
const PanelChildren = lazy(() => import('./PanelChildren'));
const MenuChildren = lazy(() => import('./MenuChildren'));

function MenuItemV2({ item, onToggle, shouldShimmer, shimmerList, direction }) {
  const {
    panelData,
    openItems,
    panelLevel: levelData,
    mapPagePosition,
    displaySimulationPanel,
    lastPanelDisplayed,
    shimmered,
    menuStructure,
    panelInterfere,
    twinIndex,
    siblingCount,
  } = useDirectorFun('left');
  let imgClassName = 'rotate0';

  let className = classNames('icon');
  const [shimmerOn, setShimmerOn] = useState(false);
  const [level, setLevel] = useState(0);
  const [style, setStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({});

  const dispatch = useDispatch();

  const isOpen = openItems[item.key];
  const displayedItem = panelData.filter((panel) => panel.key === item.key)[0];

  if (displayedItem && displayedItem?.rotate === 90) {
    imgClassName = 'rotate90';
  }
  const panelChildren = item.children.filter((child) => child.key.endsWith('_panel'));
  const menuChildren = item.children.filter((child) => !child.key.endsWith('_panel'));
  className = useSetIconActive(
    openItems,
    displayedItem,
    className,
    setLevel,
    shimmerOn,
    levelData,
    isOpen
  );

  useHandleInitialOpen(
    displayedItem,
    onToggle,
    direction,
    displaySimulationPanel,
    lastPanelDisplayed
  );
  useHandleIconShimmer(shouldShimmer, shimmered, item, dispatch, direction, setShimmerOn);
  let menuDirection = displayedItem?.subMenuOpenDirection;
  const handleToggle = (key) => {
    panelInterfere === -1 && dispatch(setPanelInterfere({ direction, value: 0 }));
    dispatch(setTwinIndex({ direction, value: 0 }));

    onToggle(key);
  };

  useHandleDisabledIcons(setStyle, setImgStyle, panelChildren);

  return (
    <>
      {' '}
      <div
        key={displayedItem.key}
        className={className}
        style={style}
        onClick={() => handleToggle(displayedItem.key)}
      >
        <img
          style={imgStyle}
          className={imgClassName}
          alt="item icon"
          src={displayedItem.icon}
        ></img>
      </div>
      {isOpen && (
        <>
          {panelChildren.length > 0 && (
            <Suspense>
              <PanelChildren level={level} displayedItem={displayedItem} direction={direction} />
            </Suspense>
          )}

          {menuChildren.length > 0 && (
            <Suspense>
              <MenuChildren
                menuChildren={menuChildren}
                openItems={openItems}
                menuDirection={menuDirection}
                level={level}
                iconClassName={className}
                onToggle={onToggle}
                direction={direction}
              />
            </Suspense>
            // <MapMenuV2 menuDirection={menuDirection} level={level}>
            // 	<MenuList
            // 		iconClassName={iconClassName}
            // 		items={menuChildren}
            // 		openItems={openItems}
            // 		onToggle={onToggle}
            // 	/>
            // </MapMenuV2>
          )}
        </>
      )}
    </>
  );
}
export default MenuItemV2;

// useEffect(() => {
// 	if (shouldShimmer && s) {
// 		console.log("SHIMMER CTRL", s);

// 		setShimmerOn(true);
// 		className = classNames("icon", "shimmer-on");
// 	} else {
// 		setShimmerOn(false);
// 		s = false;
// 		className = classNames("icon", "shimmer-off");
// 	}
// }, [shouldShimmer]);

// className = classNames("icon", shimmerOn ? "shimmer-on" : "shimmer-off");
// useEffect(() => {
// 	if (shimmerOn) {
// 		const timeout = setTimeout(() => {
// 			className = classNames("icon", "shimmer-off");
// 			console.log("SHIMMER OFF BY TIMER");
// 			setShimmerOn(false);
// 			s = false;
// 		}, 3000);
// 		return () => clearTimeout(timeout);
// 	}
// });
