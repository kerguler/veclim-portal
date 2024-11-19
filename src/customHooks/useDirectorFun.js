import { useSelector } from "react-redux";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";
import { setMapMenuOpen } from "store";
import { setRightMapMenuOpen } from "store";
import { setPanelOpen } from "store";
import { setRightPanelOpen } from "store";
import { setDirectInit } from "store";
import { setDirectInitRight } from "store";
import { setDirectMap } from "store";
import { setDirectMapRight } from "store";
import { setTwinIndex } from "store";
import { setTwinIndexRight } from "store";
import { setDisplayedPanelID } from "store";
import { setRightDisplayedPanelID } from "store";
import { setChartParameters } from "store";
import { setChartParametersRight } from "store";
import { setTwinArrayRight } from "store";
import { setTwinArray } from "store";
import { setSwitcher } from "store";
import { setSwitcherRight } from "store";
import { setDisplayedIconsRight } from "store";
import { setDisplayedIcons } from "store";
import { appendToColorsChartParameters } from "store";
import { appendToColorsChartParametersRight } from "store";
import { setMapPagePosition } from "store";
import { appendToLabelsChartParameters } from "store";
import { appendToLabelsChartParametersRight } from "store";
import { appendToPlottedKeysChartParameters } from "store";
import { appendToPlottedKeysChartParametersRight } from "store";
import { spliceChartParametersForSlices } from "store";
import { spliceChartParametersForSlicesRight } from "store";
import { setBrushRange } from "store";
import { setBrushRangeRight } from "store";
import { setBrushDatay } from "store";
import { setBrushDatayRight } from "store";
import { setBrushData } from "store";
import { setBrushDataRight } from "store";
import { setPanelInterfere } from "store";
import { setPanelInterfereRight } from "store";
function useDirectorFun(direction) {
	// TWIN INDEX
	const twinIndexLeft = useSelector((state) => state.graphSwitch.twinIndex);
	const twinIndexRight = useSelector(
		(state) => state.graphSwitch.twinIndexRight
	);
	const twinIndex = directorFun(direction, twinIndexLeft, twinIndexRight);

	// DISPLAYED PANEL ID
	const leftDisplayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.displayedPanelID
	);
	const rightDisplayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMenu.displayedPanelID
	);
	const displayedPanelID = directorFun(
		direction,
		leftDisplayedPanelID,
		rightDisplayedPanelID
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
	const directMapLeft = useSelector(
		(state) => state.fetcher.fetcherStates.directMap
	);
	const directMapRight = useSelector(
		(state) => state.fetcher.fetcherStates.directMapRight
	);
	const directMap = directorFun(direction, directMapLeft, directMapRight);

	// DIRECT INIT
	const directInitLeft = useSelector(
		(state) => state.fetcher.fetcherStates.directInit
	);
	const directInitRight = useSelector(
		(state) => state.fetcher.fetcherStates.directInitRight
	);
	const directInit = directorFun(direction, directInitLeft, directInitRight);

	// MAP VECTOR
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);

	// PANEL DATA
	const { panelData, parPickerPanelData } = useContext(PanelContext);
	const panelDataDir = directorFun(direction, panelData, parPickerPanelData);
	// MAP MENU OPEN
	const mapMenuOpenLeft = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.mapMenuOpen
	);
	const mapMenuOpenRight = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMenu.mapMenuOpen
	);
	const mapMenuOpen = directorFun(direction, mapMenuOpenLeft, mapMenuOpenRight);

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
	const panelOpenLeft = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.panelOpen
	);
	const panelOpenRight = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMenu.panelOpen
	);
	const panelOpen = directorFun(direction, panelOpenLeft, panelOpenRight);

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
	const chartParametersLeft = useSelector(
		(state) => state.panel.chartParameters
	);
	const chartParametersRight = useSelector(
		(state) => state.panel.chartParametersRight
	);
	const chartParameters = directorFun(
		direction,
		chartParametersLeft,
		chartParametersRight
	);

	// BRUSH DATA
	const brushDataLeft = useSelector((state) => state.panel.brushData);
	const brushDataRight = useSelector((state) => state.panel.brushDataRight);
	const brushData = directorFun(direction, brushDataLeft, brushDataRight);
	// BRUSH DATAY
	const brushDatayLeft = useSelector((state) => state.panel.brushDatay);
	const brushDatayRight = useSelector((state) => state.panel.brushDatayRight);
	const brushDatay = directorFun(direction, brushDatayLeft, brushDatayRight);

	const xBrushRangeLeft = useSelector(
		(state) => state.fetcher.fetcherStates.brushRange
	);
	const xBrushRangeRight = useSelector(
		(state) => state.fetcher.fetcherStates.brushRangeRight
	);
	const xBrushRange = directorFun(direction, xBrushRangeLeft, xBrushRangeRight);

	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.switchMap
	);
	// SETTERS
	const setMapMenuOpenDir = directorFun(
		direction,
		setMapMenuOpen,
		setRightMapMenuOpen
	);
	const setDirectInitDir = directorFun(
		direction,
		setDirectInit,
		setDirectInitRight
	);
	const setDirectMapDir = directorFun(
		direction,
		setDirectMap,
		setDirectMapRight
	);
	const setPanelOpenDir = directorFun(
		direction,
		setPanelOpen,
		setRightPanelOpen
	);

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
	const setChartParametersDir = directorFun(
		direction,
		setChartParameters,
		setChartParametersRight
	);
	const setDisplayedPanelIDDir = directorFun(
		direction,
		setDisplayedPanelID,
		setRightDisplayedPanelID
	);
	const setDisplayedIconsDir = directorFun(
		direction,
		setDisplayedIcons,
		setDisplayedIconsRight
	);
	const setSwitcherDir = directorFun(direction, setSwitcher, setSwitcherRight);
	const appendToColorsChartParametersDir = directorFun(
		direction,
		appendToColorsChartParameters,
		appendToColorsChartParametersRight
	);

	const appendToLabelsChartParametersDir = directorFun(
		direction,
		appendToLabelsChartParameters,
		appendToLabelsChartParametersRight
	);
	const setMapPagePositionDir = setMapPagePosition;
	const appendToPlottedKeysChartParametersDir = directorFun(
		direction,
		appendToPlottedKeysChartParameters,
		appendToPlottedKeysChartParametersRight
	);
	const spliceChartParametersForSlicesDir = directorFun(
		direction,
		spliceChartParametersForSlices,
		spliceChartParametersForSlicesRight
	);
	const setBrushRangeDir = directorFun(
		direction,
		setBrushRange,
		setBrushRangeRight
	);
	const setBrushDatayDir = directorFun(
		direction,
		setBrushDatay,
		setBrushDatayRight
	);
	const setBrushDataDir = directorFun(
		direction,
		setBrushData,
		setBrushDataRight
	);

	const setPanelInterfereDir = directorFun(
		direction,
		setPanelInterfere,
		setPanelInterfereRight
	);
	return {
		setPanelInterfereDir,
		setBrushDataDir,
		switchMap,
		setBrushDatayDir,
		xBrushRange,
		setBrushRangeDir,
		brushDatay,
		appendToColorsChartParametersDir,
		appendToLabelsChartParametersDir,
		appendToPlottedKeysChartParametersDir,
		spliceChartParametersForSlicesDir,
		mapPagePosition,
		chartParameters,
		brushData,
		setMapPagePositionDir,
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
		setMapMenuOpenDir,
		mapMenuOpen,
		setPanelOpenDir,
		setDirectInitDir,
		setDirectMapDir,
		setTwinIndexDir,
		setDisplayedPanelIDDir,
		setChartParametersDir,
		setTwinArrayDir,
		setDisplayedIconsDir,
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
