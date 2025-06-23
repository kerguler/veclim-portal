import { useSelector } from "react-redux";
import { useContext } from "react";

import { useDispatch } from "react-redux";
import PanelContextV2 from "context/panelsIconsV2";
import { setOpenItems } from "store";
import { use } from "react";

function useDirectorFun(direction) {
	const yaxisInfo = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.brush.yaxisInfo,
	);
	const shimmerIcons = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.shimmer,
	);
	const simSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.sliders.slider1
				.value,
	);

	const simSlider1Enabled = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.sliders.slider1
				.enabled,
	);

	const interferePanelStyle = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].interferePanelStyle,
	);
	const dispatch = useDispatch();
	const openItems = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.openItems,
	);
	const dataArrived = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.dataArrived,
	);

	const invalidateSimData = useSelector(
		(state) => state.fetcher.fetcherStates.invalidateSimData,
	);
	const invalidateTsData = useSelector(
		(state) => state.fetcher.fetcherStates.invalidateTsData,
	);
	const messenger = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.messenger,
	);

	const plotReady = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].chart.plotReady,
	);

	// TWIN INDEX
	const twinIndex = useSelector(
		(state) => state.graphSwitch[direction].twinIndex,
	);

	// DISPLAYED PANEL ID
	const displayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].displayedPanelID,
	);

	// DISPLAYED ICONS
	const displayedIcons = useSelector(
		(state) => state.graphSwitch[direction].displayedIcons,
	);

	// DIRECT MAP
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].directMap,
	);

	// DIRECT INIT
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].directInit,
	);

	// MAP VECTOR
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector,
	);

	// PANEL DATA
	const {
		panelData,
		parPickerPanelData,
		menuStructure,
		simulationPanels,
		tree,
	} = useContext(PanelContextV2);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray,
	);
	const panelDataDir = directorFun(direction, panelData, parPickerPanelData);

	const { tileIcons, parPickerTileIcons } = useContext(PanelContextV2);
	const tileIconsDir = directorFun(direction, tileIcons, parPickerTileIcons);
	// MAP MENU OPEN
	const mapMenuOpen = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].mapMenuOpen,
	);

	// TWIN ARRAY
	const twinArrayLeft = useSelector((state) => state.graphSwitch.twinArray);
	const twinArrayRight = useSelector(
		(state) => state.graphSwitch.twinArrayRight,
	);
	const twinArray = directorFun(direction, twinArrayLeft, twinArrayRight);

	// SWITCHER
	const switcherLeft = useSelector((state) => state.graphSwitch.switcher);
	const switcherRight = useSelector(
		(state) => state.graphSwitch.switcherRight,
	);
	const switcher = directorFun(direction, switcherLeft, switcherRight);
	// PANEL OPEN
	const panelOpen = useSelector(
		(state) => state.fetcher.fetcherStates.menu[direction].panelOpen,
	);
	const currentMapBounds = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapBounds,
	);
	const currentMaxBounds = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMaxBounds,
	);
	const currentMapZoom = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapZoom,
	);
	const currentMapCenter = useSelector(
		(state) => state.fetcher.fetcherStates.map.currentMapCenter,
	);
	const panelInterfere = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].panel.panelInterfere,
	);

	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName,
	);
	const mapPagePosition = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition,
	);

	const chartParameters = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.chartParameters,
	);

	// BRUSH DATA
	const brushData = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.brush.brushData,
	);
	// BRUSH DATAY
	const brushDatay = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.brush.brushDatay,
	);

	const brushRange = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu[direction].chart.brush.brushRange,
	);

	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.switchMap,
	);
	// SETTERS

	const panelLevelLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.panelLevel,
	);

	return {
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
		tileIconsDir,
		invalidateSimData,
		invalidateTsData,
		messenger,
		dataArrived,
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
		switcher,
		displayedPanelID,
		displayedIcons,
		directMap,
		directInit,
		mapVector,
		panelDataDir,
		mapMenuOpen,
		dispatch,
		openItems,
		yaxisInfo,
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
