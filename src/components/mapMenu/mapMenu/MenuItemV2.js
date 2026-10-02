import useDirectorFun from 'customHooks/useDirectorFun';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { lazy, Suspense } from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
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
  // const [style, setStyle] = useState({});
  // const [imgStyle, setImgStyle] = useState({});
  const [showTools, setShowTools] = useState(false);

  const isOpen = openItems[item.key];

  // For normal items, find the corresponding panel; for utility items we won't have one
  const displayedItem = Array.isArray(panelData)
    ? panelData.find((panel) => panel.key === item.key)
    : null;

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
    shimmered?.[item.key],
    item.key,
    dispatch,
    direction,
    setShimmerOn
  );
  const toolsBtnRef = useRef(null);
  const [anchorPoint, setAnchorPoint] = useState(null);


  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipPos, setTooltipPos] = useState(null);
  const tooltipRef = useRef(null);


  const updateTooltipPos = () => {
    if (!toolsBtnRef.current) return;
    const r = toolsBtnRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const M = 10;
    const isMobile = vw < 500;
    const maxWidth = isMobile ? Math.min(260, vw - 2 * M) : 260;

    if (isMobile) {
      setTooltipPos({
        left: -9999,
        bottom: vh - r.top + 8,
        maxWidth,
        measured: false,
      });
    } else {
      const top = Math.max(M, Math.min(r.top + r.height / 2 - 20, vh - 60 - M));
      setTooltipPos({
        left: r.right + 8,
        top,
        maxWidth: Math.min(maxWidth, Math.max(vw - r.right - 2 * M, 160)),
        measured: false,
      });
    }
  };

  useLayoutEffect(() => {
    if (!tooltipOpen || !tooltipPos || tooltipPos.measured) return;
    if (!tooltipRef.current || !toolsBtnRef.current) return;

    const tipRect = tooltipRef.current.getBoundingClientRect();
    const r = toolsBtnRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const M = 10;
    const isMobile = vw < 500;

    if (isMobile) {
      const left = Math.max(
        M,
        Math.min(r.left + r.width / 2 - tipRect.width / 2, vw - tipRect.width - M)
      );
      setTooltipPos((p) => ({ ...p, left, measured: true }));
    } else {
      const top = Math.max(
        M,
        Math.min(r.top + r.height / 2 - tipRect.height / 2, vh - tipRect.height - M)
      );
      setTooltipPos((p) => ({ ...p, top, measured: true }));
    }
  }, [tooltipOpen, tooltipPos]);

  useEffect(() => {
    if (!tooltipOpen) return;
    const close = (e) => {
      if (toolsBtnRef.current?.contains(e.target)) return;
      setTooltipOpen(false);
    };
    window.addEventListener('click', close, true);
    window.addEventListener('scroll', close, true);
    return () => {
      window.removeEventListener('click', close, true);
      window.removeEventListener('scroll', close, true);
    };
  }, [tooltipOpen]);

  let menuDirection = displayedItem?.subMenuOpenDirection;
  const handleToggle = (e, key) => {
 
    if (shouldDisable) {
      setTooltipOpen((v) => {
        const next = !v;
        if (next) updateTooltipPos();
        return next;
      });
      return;
    }

    // 🔹 Utility action: open tools popover, do NOT change panels
    if (item.isUtility) {
      const r = e.currentTarget.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // estimated popover size (or make these match your CSS)
      const POP_W = 280;
      const POP_H = 260;
      const M = 10;

      // Try below first, but if it would go off-screen, place above.
      const spaceBelow = vh - r.bottom;
      const preferAbove = spaceBelow < POP_H + M;

      let x = r.left;
      let y = preferAbove ? r.top - M : r.bottom + M;

      // Clamp horizontally
      x = Math.max(M, Math.min(x, vw - POP_W - M));

      // Clamp vertically
      y = Math.max(M, Math.min(y, vh - POP_H - M));

      setAnchorPoint({ x, y, preferAbove });
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

  const { style, imgStyle, shouldDisable, disabledTooltip } =
    useHandleDisabledIcons(panelChildren, displayedItem?.rotate);

  return (
    <>
      <div
        ref={toolsBtnRef}
        key={baseItem.key}
        className={className}
        style={style}
        onClick={(e) => handleToggle(e, baseItem.key)}
        onMouseEnter={() => {
          if (!shouldDisable || !disabledTooltip) return;
          updateTooltipPos();
          setTooltipOpen(true);
        }}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        <img
          style={imgStyle}
          className={imgClassName}
          alt="item icon"
          src={baseItem.icon}
        />
      </div>
      {tooltipOpen &&
        shouldDisable &&
        disabledTooltip &&
        tooltipPos &&
        createPortal(
          <div
            ref={tooltipRef}
            className="icon-disabled-tooltip"
            style={{
              position: 'fixed',
              left: tooltipPos.left,
              top: tooltipPos.top,
              bottom: tooltipPos.bottom,
              maxWidth: tooltipPos.maxWidth,
              visibility: tooltipPos.measured ? 'visible' : 'hidden',
            }}
          >
            {disabledTooltip}
          </div>,
          document.body
        )}
      {showTools && (
        <div className="map-tools-container" style={{ position: 'relative' }}>
          <MapToolsPopover
            onClose={() => setShowTools(false)}
            anchorPoint={anchorPoint}
            ignoreRef={toolsBtnRef}
          />
        </div>
      )}
      {isOpen && !item.isUtility && (
        <>
          {panelChildren.length > 0 && (
            <Suspense>
              {/* PANEL CHILDREN WILL DISPLAY THE PANEL ACCORDING TO TWIN INDEX */}
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
