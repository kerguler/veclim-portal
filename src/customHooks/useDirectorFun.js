import { useSelector } from 'react-redux';
import { useContext } from 'react';

import { useDispatch } from 'react-redux';
import PanelContextV2 from 'context/panelsIconsV2';
import { setOpenItems } from 'store';

function useDirectorFun(direction) {
  const simList = useSelector((state) => state.simulation.simList);
  const isPermalinkClick = useSelector(
    (state) => state.fetcher.fetcherStates.map.isPermalinkClick
  );
  const shimmered = useSelector((state) => state.mapMenu[direction].shimmered);
  const albochickStatus = useSelector(
    (state) => state.simulation.albochickStatus
  );
  const displaySimulationPanel = useSelector(
    (state) => state.mapMenu[direction].displaySimulationPanel
  );

  const permalink = useSelector(
    (state) => state.fetcher.fetcherStates.map.permalink
  );
  const lastPanelDisplayed = useSelector(
    (state) => state.mapMenu[direction].lastPanelDisplayed
  );
  const yaxisInfo = useSelector(
    (state) => state.mapMenu[direction].chart.brush.yaxisInfo
  );
  const optionsPanel = useSelector(
    (state) => state.fetcher.fetcherStates.map.optionsPanel
  );
  const shimmerIcons = useSelector(
    (state) => state.mapMenu[direction].chart.shimmer
  );
  const simSlider1Value = useSelector(
    (state) => state.mapMenu[direction].chart.sliders.slider1.value
  );
  const panelTop = useSelector(
    (state) => state.mapMenu[direction].panel.panelTop
  );
  const simSlider1Enabled = useSelector(
    (state) => state.mapMenu[direction].chart.sliders.slider1.enabled
  );
  const siblingCount = useSelector(
    (state) => state.graphSwitch[direction].siblingCount
  );
  const interferePanelStyle = useSelector(
    (state) => state.mapMenu[direction].interferePanelStyle
  );
  const dispatch = useDispatch();
  const openItems = useSelector((state) => state.mapMenu.left.openItems);
  const dataArrived = useSelector(
    (state) => state.mapMenu[direction].chart.dataArrived
  );

  const invalidateSimData = useSelector(
    (state) => state.fetcher.fetcherStates.invalidateSimData
  );
  const invalidateTsData = useSelector(
    (state) => state.fetcher.fetcherStates.invalidateTsData
  );
  const messenger = useSelector(
    (state) => state.mapMenu[direction].chart.messenger
  );

  const plotReady = useSelector(
    (state) => state.mapMenu[direction].chart.plotReady
  );

  // TWIN INDEX
  const twinIndex = useSelector(
    (state) => state.graphSwitch[direction].twinIndex
  );

  // DISPLAYED PANEL ID
  const displayedPanelID = useSelector(
    (state) => state.mapMenu[direction].displayedPanelID
  );

  // DISPLAYED ICONS
  const displayedIcons = useSelector(
    (state) => state.graphSwitch[direction].displayedIcons
  );

  // DIRECT MAP
  const directMap = useSelector((state) => state.mapMenu[direction].directMap);

  // DIRECT INIT
  const directInit = useSelector(
    (state) => state.mapMenu[direction].directInit
  );
  const directInitError = useSelector(
    (state) => state.mapMenu[direction].directInitError
  );
  // MAP VECTOR
  const mapVector = useSelector(
    (state) => state.fetcher.fetcherStates.mapVector
  );

  // PANEL DATA
  const { panelData, menuStructure, simulationPanels, tree } =
    useContext(PanelContextV2);
  const tileArray = useSelector(
    (state) => state.fetcher.fetcherStates.tileArray
  );

  const { tileIcons, tileIconsAlbo, tileIconsSand } =
    useContext(PanelContextV2);
  // MAP MENU OPEN
  const mapMenuOpen = useSelector(
    (state) => state.mapMenu[direction].mapMenuOpen
  );

  // TWIN ARRAY
  const twinArrayLeft = useSelector((state) => state.graphSwitch.twinArray);
  const twinArrayRight = useSelector(
    (state) => state.graphSwitch.twinArrayRight
  );
  const twinArray = directorFun(direction, twinArrayLeft, twinArrayRight);

  // SWITCHER
  const switcherLeft = useSelector((state) => state.graphSwitch.switcher);
  const switcherRight = useSelector((state) => state.graphSwitch.switcherRight);
  const switcher = directorFun(direction, switcherLeft, switcherRight);
  // PANEL OPEN
  const panelOpen = useSelector((state) => state.mapMenu[direction].panelOpen);
  const currentMapBounds = useSelector(
    (state) => state.fetcher.fetcherStates.map.currentMapBounds
  );
  const currentMaxBounds = useSelector(
    (state) => state.fetcher.fetcherStates.map.currentMaxBounds
  );
  const currentMapZoom = useSelector(
    (state) => state.fetcher.fetcherStates.map.currentMapZoom
  );
  const currentMapCenter = useSelector(
    (state) => state.fetcher.fetcherStates.map.currentMapCenter
  );
  const panelInterfere = useSelector(
    (state) => state.mapMenu[direction].panel.panelInterfere
  );
  const vectorNames = useSelector((state) => state.vector.vectorNames);

  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );
  const mapPagePosition = useSelector(
    (state) => state.fetcher.fetcherStates.map.mapPagePosition
  );

  const chartParameters = useSelector(
    (state) => state.mapMenu[direction].chart.chartParameters
  );

  // BRUSH DATA
  const brushData = useSelector(
    (state) => state.mapMenu[direction].chart.brush.brushData
  );
  // BRUSH DATAY
  const brushDatay = useSelector(
    (state) => state.mapMenu[direction].chart.brush.brushDatay
  );

  const brushRange = useSelector(
    (state) => state.mapMenu[direction].chart.brush.brushRange
  );

  const switchMap = useSelector(
    (state) => state.fetcher.fetcherStates.switchMap
  );
  // SETTERS

  const panelLevel = useSelector(
    (state) => state.mapMenu[direction].panelLevel
  );
  const panelLevelLeft = panelLevel;
  const userPosition = useSelector(
    (state) => state.fetcher.fetcherStates.map.userPosition
  );
  return {
    isPermalinkClick,
    userPosition,
    permalink,
    vectorNames,
    currentMapBounds,
    currentMapCenter,
    currentMapZoom,
    currentMaxBounds,
    tree,
    simSlider1Enabled,
    shimmerIcons,
    simSlider1Value,
    simulationPanels,
    setOpenItems,
    menuStructure,
    panelLevelLeft,
    panelLevel,
    tileIcons,
    tileIconsAlbo,
    tileIconsSand,
    invalidateSimData,
    invalidateTsData,
    messenger,
    dataArrived,
    plotReady,
    simList,
    switchMap,
    brushRange,
    brushDatay,

    mapPagePosition,
    chartParameters,
    brushData,
    panelInterfere,
    vectorName,
    twinIndex,
    panelOpen,
    twinArray,
    switcher,
    displayedPanelID,
    displayedIcons,
    directMap,
    directInit,
    directInitError,
    mapVector,
    panelData,
    mapMenuOpen,
    dispatch,
    openItems,
    yaxisInfo,
    optionsPanel,
    tileArray,
    displaySimulationPanel,
    lastPanelDisplayed,
    shimmered,
    panelTop,
    siblingCount,
    albochickStatus,
  };
}
function directorFun(direction, dataleft, dataright) {
  if (direction === 'right') {
    return dataright;
  } else {
    return dataleft;
  }
}
export { directorFun };

export default useDirectorFun;
