import { useSelector } from "react-redux";
import { useContext } from "react";

import { setTwinIndex } from "store";
import { setTwinIndexRight } from "store";

import { setTwinArrayRight, setTwinArray } from "store";
import { setSwitcher, setSwitcherRight } from "store";
import { setDisplayedIcons, setDisplayedIconsRight } from "store";

import { useDispatch } from "react-redux";
import PanelContextV2 from "context/panelsIconsV2";
import { setOpenItems } from "store";
import { setInterferePanelStyle } from "store";
function useDirectorFun(direction) {
	const shimmerIcons = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.shimmer
	);
	const simSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.sliders.slider1.value
	);

	const simSlider1Enabled = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.sliders.slider1.enabled
	);

	const interferePanelStyleRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.interferePanelStyle
	);
	const dispatch = useDispatch();
	const openItems = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.openItems
	);
	const dataArrivedLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.chart.dataArrived
	);
	const dataArrivedRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.dataArrived
	);
	const dataArrived = directorFun(direction, dataArrivedLeft, dataArrivedRight);

	const invalidateSimData = useSelector(
		(state) => state.fetcher.fetcherStates.invalidateSimData
	);
	const invalidateTsData = useSelector(
		(state) => state.fetcher.fetcherStates.invalidateTsData
	);
	const messenger = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.messenger
	);

	const plotReady = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.plotReady
	);

	// TWIN INDEX
	const twinIndexLeft = useSelector((state) => state.graphSwitch.twinIndex);
	const twinIndexRight = useSelector(
		(state) => state.graphSwitch.twinIndexRight
	);
	const twinIndex = directorFun(direction, twinIndexLeft, twinIndexRight);

	// DISPLAYED PANEL ID
	const displayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].displayedPanelID
	);

	// DISPLAYED ICONS
	const displayedIconsLeft = useSelector(
		(state) => state.graphSwitch.displayedIcons
	);
	const displayedIconsRight = useSelector(
		(state) => state.graphSwitch.displayedIconsRight
	);
	const displayedIcons = directorFun(
		direction,
		displayedIconsLeft,
		displayedIconsRight
	);
	// DIRECT MAP
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].directMap
	);

	// DIRECT INIT
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].directInit
	);

	// MAP VECTOR
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);

	// PANEL DATA
	const {
		panelData,
		parPickerPanelData,
		menuStructure,
		simulationPanels,
		tree,
	} = useContext(PanelContextV2);
	const panelDataDir = directorFun(direction, panelData, parPickerPanelData);

	const { tileIcons, parPickerTileIcons } = useContext(PanelContextV2);
	const tileIconsDir = directorFun(direction, tileIcons, parPickerTileIcons);
	// MAP MENU OPEN
	const mapMenuOpen = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].mapMenuOpen
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
	const panelOpen = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].panelOpen
	);

	const panelInterfereLeft = useSelector((state) => state.panel.panelInterfere);
	const panelInterfereRight = useSelector(
		(state) => state.panel.panelInterfereRight
	);
	const panelInterfere = directorFun(
		direction,
		panelInterfereLeft,
		panelInterfereRight
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const mapPagePosition = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);


	const chartParameters = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.chartParameters
	);

	// BRUSH DATA
	const brushData = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.brush.brushData
	);
	// BRUSH DATAY
	const brushDatay = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.brush.brushDatay
	);

	const brushRange = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.brush.brushRange
	);

	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.switchMap
	);
	// SETTERS

	const setTwinIndexDir = directorFun(
		direction,
		setTwinIndex,
		setTwinIndexRight
	);
	const setTwinArrayDir = directorFun(
		direction,
		setTwinArray,
		setTwinArrayRight
	);

	const setDisplayedIconsDir = directorFun(
		direction,
		setDisplayedIcons,
		setDisplayedIconsRight
	);
	const setSwitcherDir = directorFun(direction, setSwitcher, setSwitcherRight);

	const panelLevelLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.panelLevel
	);

	return {
		tree,
		simSlider1Enabled,
		shimmerIcons,
		simSlider1Value,
		setInterferePanelStyle,
		interferePanelStyleRight,
		simulationPanels,
		setOpenItems,
		menuStructure,
		panelLevelLeft,
		tileIconsDir,
		invalidateSimData,
		invalidateTsData,
		messenger,
		dataArrived,
		dataArrivedLeft,
		dataArrivedRight,
		plotReady,

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
		setSwitcherDir,
		switcher,
		displayedPanelID,
		displayedIcons,
		directMap,
		directInit,
		mapVector,
		panelDataDir,
		mapMenuOpen,
		setTwinIndexDir,
		setTwinArrayDir,
		setDisplayedIconsDir,
		dispatch,
		openItems,
	};
}
function directorFun(direction, dataleft, dataright) {
	if (direction === "right") {
		return dataright;
	} else {
		return dataleft;
	}
}
export { directorFun };

export default useDirectorFun;
