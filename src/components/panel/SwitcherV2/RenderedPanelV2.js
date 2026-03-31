import Panel from '../Panel';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { setPanelTop } from 'store';
import 'components/panel/Switcher/Switcher.css';
import useDirectorFun from 'customHooks/useDirectorFun';
import usePanelResize from '../usePanelResize';
import { useEffect } from 'react';
import { useState } from 'react';
import { setOpenItems } from 'store';
import { setPanelLevel } from 'store';
import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import UnifiedRechartPlotterV2 from 'components/charts/Plotter/plotterV2/UnifiedRechartPlotterV2';
import { Suspense } from 'react';
import SwitcherArrows from '../SwitcherArrows';
const RenderedPanelV2 = ({
  panel,
  panelChart,
  panelClassName,
  direction,
  passedKey,
  panelChildren,
}) => {
  const dispatch = useDispatch();
  const {
    openItems,
    panelLevelLeft: levelData,
    mapPagePosition,
    interferePanelStyleRight: interferePanelStyle,
  } = useDirectorFun(direction);
  const panelRef = useRef(null);
  usePanelResize({ panelRef, direction, setPanelTop });

  const handlePanelClosed = (value) => {
    let openItemsTemp = { ...openItems };
    delete openItemsTemp[passedKey.parent];
    dispatch(setOpenItems(openItemsTemp));
    dispatch(
      setPanelLevel({
        ...levelData,
        level: Object.keys(openItemsTemp).length,
      })
    );
  };
  const [showCoordinateWarning, setShowCoordinateWarning] = useState(false);
  useEffect(() => {
    if (mapPagePosition.lat === null) {
      setShowCoordinateWarning(true);
    } else {
      setShowCoordinateWarning(false);
    }
  }, [mapPagePosition.lat]);

  let displayedPanel;
  if (panelChart) {
    if (showCoordinateWarning) {
      displayedPanel = (
        <div>You need to pick a coordinate for the graphics to work</div>
      );
    } else {
      displayedPanel = (
        <div className="panel-content chart">
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <UnifiedRechartPlotterV2 direction={direction} />
            </Suspense>
          </ErrorBoundary>
        </div>
      );
    }
  }
  return (
    <span
      className={`panel-restrictive-wrapper ${direction}`}
      style={interferePanelStyle}
    >
      <div ref={panelRef} style={interferePanelStyle}>
        <Panel
          tabs={panelChildren}
          passedKey={passedKey}
          direction={direction}
          className={panelClassName}
          onClosed={(key) => handlePanelClosed(key)}
        >
          <div className="panel-content" style={{ userSelect: 'none' }}>
            {panel}
            {displayedPanel}
          </div>{' '}
        </Panel>
      </div>
    </span>
  );
};

export default RenderedPanelV2;
