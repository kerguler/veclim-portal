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
const PanelChildren = lazy(() => import('./PanelChildren'));
const MenuChildren = lazy(() => import('./MenuChildren'));

function MenuItemV2({ item, onToggle, shouldShimmer, shimmerList, direction }) {
  const {
    panelDataDir: panelData,
    openItems,
    panelLevelLeft: levelData,
    mapPagePosition,
  } = useDirectorFun('left');

  let className = classNames('icon');
  const [shimmerOn, setShimmerOn] = useState(false);

  const dispatch = useDispatch();
  const displaySimulationPanel = useSelector(
    (state) => state.mapMenu['left'].displaySimulationPanel
  );

  const isOpen = openItems[item.key];
  const displayedItem = panelData.filter((panel) => panel.key === item.key)[0];

  let imgClassName = 'rotate0';
  if (displayedItem && displayedItem?.rotate === 90) {
    imgClassName = 'rotate90';
  }
  const panelChildren = item.children.filter((child) => child.key.endsWith('_panel'));

  const menuChildren = item.children.filter((child) => !child.key.endsWith('_panel'));
  const [level, setLevel] = useState(0);

  console.log(openItems[displayedItem.key], className);
  useEffect(() => {
    if (displayedItem?.initialOpen && !displaySimulationPanel) {
      onToggle(displayedItem.key);
    }
    if (displayedItem.key === displaySimulationPanel) {
      console.log('SET simulation panel NULL');
      dispatch(setDisplaySimulationPanel({ direction, value: null }));
    }
  }, [displayedItem.initialOpen, displaySimulationPanel]);
  const shimmered = useSelector((state) => state.mapMenu['left'].shimmered);

  useEffect(() => {
    if (shouldShimmer && !shimmered[item.key]) {
      setShimmerOn(true);
      const timeout = setTimeout(() => {
        setShimmerOn(false);
        let key = item['key'];

        dispatch(
          setShimmered({
            direction,
            value: { ...shimmered, [key]: true },
          })
        );
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [shouldShimmer, shimmered]);
  //   className = classNames(className, shimmerOn ? 'shimmer-on' : 'shimmer-off');
  if (openItems[displayedItem.key]) {
    if (displayedItem.key !== 'menu_icon' && displayedItem.key !== 'secondary_menu_icon') {
      className = classNames('icon', 'active', shimmerOn ? 'shimmer-on' : 'shimmer-off');
    } else {
      className = classNames('icon', shimmerOn ? 'shimmer-on' : 'shimmer-off');
    }
  } else {
    className = classNames('icon', shimmerOn ? 'shimmer-on' : 'shimmer-off');
  }

  useEffect(() => {
    isOpen && setLevel(levelData.level);
  }, [isOpen, levelData.level]);

  let menuDirection = displayedItem?.subMenuOpenDirection;

  const [style, setStyle] = useState({});
  const [imgStyle, setImgStyle] = useState({});

  useEffect(() => {
    panelChildren.forEach((panel) => {
      let myPanel = panelData.filter((panelData) => panelData.key === panel.key)[0];
      if (mapPagePosition.lat === null) {
        if (
          (myPanel && myPanel.chartParameters && Object.keys(myPanel.chartParameters).length > 0) ||
          myPanel.positionDependent
        ) {
          setStyle({
            backgroundColor: 'var(--neutral-color1)',
            pointerEvents: 'none',
            cursor: 'not-allowed',
          });
          setImgStyle({
            color: 'grey',
            //width: "20px",
            // height: "20px",
          });
        } else {
          setStyle({ color: 'white', pointerEvents: 'all' });
          setImgStyle({
            color: 'grey',
            // width: webApp ? "20px" : "2px",
            // height: webApp ? "20px" : "32px",
          });
        }
      } else {
        setStyle({ color: 'white', pointerEvents: 'all' });
        setImgStyle({
          color: 'grey',
          // width: webApp ? "20px" : "32px",
          // height: webApp ? "20px" : "32px",
        });
      }
    });
  }, [mapPagePosition.lat, openItems]);
  return (
    <>
      {' '}
      <div
        key={displayedItem.key}
        className={className}
        style={style}
        onClick={() => onToggle(displayedItem.key)}
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
