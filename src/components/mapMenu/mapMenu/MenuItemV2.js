import useDirectorFun from 'customHooks/useDirectorFun';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import useHandleInitialOpen from './useHandleInitialOpen';
import useSetIconActive from './useSetIconActive';
import useHandleIconShimmer from './useHandleIconShimmer';
import useHandleDisabledIcons from './useHandleDisabledIcons';
import { setPanelInterfere } from 'store';
import { setTwinIndex } from 'store';
import { setPanelOpen } from 'store';
import MapToolsPopover from 'components/map/MapToolsPanel/MapToolsPopover';
import { useRef } from 'react';
const PanelChildren = lazy(() => import('./PanelChildren'));
const MenuChildren = lazy(() => import('./MenuChildren'));

function MenuItemV2({ item, onToggle, shouldShimmer, direction }) {
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

  const dispatch = useDispatch();

  const [shimmerOn, setShimmerOn] = useState(false);
  const [level, setLevel] = useState(0);
  const [style, setStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({});
  const [showTools, setShowTools] = useState(false);

  const isOpen = openItems[item.key];

  // For normal items, find the corresponding panel; for utility items we won't have one
  const displayedItem = Array.isArray(panelData)
    ? panelData.find((panel) => panel.key === item.key)
    : null;

  // baseItem = the thing we use for icon/key in the DOM
  const baseItem = displayedItem || item;

  let imgClassName = 'rotate0';
  let className = classNames('icon');

  if (displayedItem && displayedItem.rotate === 90) {
    imgClassName = 'rotate90';
  }

  const panelChildren = item.children.filter((child) =>
    child.key.endsWith('_panel')
  );
  const menuChildren = item.children.filter(
    (child) => !child.key.endsWith('_panel')
  );

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

  useHandleIconShimmer(
    shouldShimmer,
    shimmered,
    item,
    dispatch,
    direction,
    setShimmerOn
  );
  const toolsBtnRef = useRef(null);
  const [anchorPoint, setAnchorPoint] = useState(null);

  let menuDirection = displayedItem?.subMenuOpenDirection;
  const handleToggle = (e, key) => {
    // 🔹 Utility action: open tools popover, do NOT change panels
    if (item.isUtility) {
      const r = e.currentTarget.getBoundingClientRect();
      setAnchorPoint({ x: r.left, y: r.bottom });
      setShowTools((v) => !v);

      return;
    }

    // Normal behaviour for real panels / menus
    if (panelInterfere === -1) {
      dispatch(setPanelInterfere({ direction, value: 0 }));
    }
    dispatch(setTwinIndex({ direction, value: 0 }));

    if (!key.endsWith('_panel')) {
      dispatch(setPanelOpen({ direction, value: false }));
    }
    onToggle(key);
  };

  useHandleDisabledIcons(setStyle, setImgStyle, panelChildren);

  return (
    <>
      <div
        ref={toolsBtnRef}
        key={baseItem.key}
        className={className}
        style={style}
        onClick={(e) => handleToggle(e, baseItem.key)}
      >
        <img
          style={imgStyle}
          className={imgClassName}
          alt="item icon"
          src={baseItem.icon}
        />
      </div>

      {showTools && (
        <MapToolsPopover
          onClose={() => setShowTools(false)}
          anchorPoint={anchorPoint}
          ignoreRef={toolsBtnRef}
        />
      )}

      {isOpen && !item.isUtility && (
        <>
          {panelChildren.length > 0 && (
            <Suspense>
              <PanelChildren
                level={level}
                displayedItem={displayedItem}
                direction={direction}
              />
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
          )}
        </>
      )}
    </>
  );
}

export default MenuItemV2;
