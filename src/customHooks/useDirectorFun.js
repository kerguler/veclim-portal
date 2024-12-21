import { useSelector } from "react-redux";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";
import { setMapMenuOpenLeft, setMapMenuOpenRight } from "store";
import { setPanelOpenLeft, setPanelOpenRight } from "store";
import { setDirectInitLeft, setDirectInitRight } from "store";
import { setDirectMapLeft, setDirectMapRight } from "store";
import { setTwinIndex } from "store";
import { setTwinIndexRight } from "store";
import { setDisplayedPanelIDLeft } from "store";
import { setDisplayedPanelIDRight } from "store";
import { setChartParameters, setChartParametersRight } from "store";
import { setTwinArrayRight, setTwinArray } from "store";
import { setSwitcher, setSwitcherRight } from "store";
import { setDisplayedIcons, setDisplayedIconsRight } from "store";
import {
	appendToColorsChartParameters,
	appendToColorsChartParametersRight,
} from "store";
import { setMapPagePosition } from "store";
import {
	appendToLabelsChartParameters,
	appendToLabelsChartParametersRight,
} from "store";
import {
	appendToPlottedKeysChartParameters,
	appendToPlottedKeysChartParametersRight,
} from "store";
import {
	spliceChartParametersForSlices,
	spliceChartParametersForSlicesRight,
} from "store";
import { setBrushRangeLeft, setBrushRangeRight } from "store";
import { setBrushDatay, setBrushDatayRight } from "store";
import { setBrushData, setBrushDataRight } from "store";
import { setPanelInterfere, setPanelInterfereRight } from "store";
import { setPlotReadyLeft, setPlotReadyRight } from "store";
import { setMapPagePositionRight } from "store";
import { setMessengerLeft } from "store";
import { setMessengerRight } from "store";
function useDirectorFun(direction) {
	const messengerLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.chart.messenger
	);
	const messengerRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.messenger
	);
	const messenger = directorFun(direction, messengerLeft, messengerRight);
	// PLOT READY
	const plotReadyLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.chart.plotReady
	);
	const plotReadyRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.plotReady
	);
	const plotReady = directorFun(direction, plotReadyLeft, plotReadyRight);

	// TWIN INDEX
	const twinIndexLeft = useSelector((state) => state.graphSwitch.twinIndex);
	const twinIndexRight = useSelector(
		(state) => state.graphSwitch.twinIndexRight
	);
	const twinIndex = directorFun(direction, twinIndexLeft, twinIndexRight);

	// DISPLAYED PANEL ID
	const displayedPanelIDLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.displayedPanelID
	);
	const displayedPanelIDRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.displayedPanelID
	);
	const displayedPanelID = directorFun(
		direction,
		displayedPanelIDLeft,
		displayedPanelIDRight
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
		(state) => state.fetcher.fetcherStates.menu.left.directMap
	);
	const directMapRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.directMap
	);
	const directMap = directorFun(direction, directMapLeft, directMapRight);

	// DIRECT INIT
	const directInitLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.directInit
	);
	const directInitRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.directInit
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
		(state) => state.fetcher.fetcherStates.menu.left.mapMenuOpen
	);
	const mapMenuOpenRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.mapMenuOpen
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
		(state) => state.fetcher.fetcherStates.menu.left.panelOpen
	);
	const panelOpenRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.panelOpen
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
	const mapPagePositionLeft = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);
	const mapPagePositionRight = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePositionRight
	);
	const mapPagePosition = directorFun(
		direction,
		mapPagePositionLeft,
		mapPagePositionRight
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
		(state) => state.fetcher.fetcherStates.menu.left.chart.brushRange
	);
	const xBrushRangeRight = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.brushRange
	);
	const xBrushRange = directorFun(direction, xBrushRangeLeft, xBrushRangeRight);

	const switchMap = useSelector(
		(state) => state.fetcher.fetcherStates.switchMap
	);
	// SETTERS
	const setMapMenuOpenDir = directorFun(
		direction,
		setMapMenuOpenLeft,
		setMapMenuOpenRight
	);
	const setDirectInitDir = directorFun(
		direction,
		setDirectInitLeft,
		setDirectInitRight
	);
	const setDirectMapDir = directorFun(
		direction,
		setDirectMapLeft,
		setDirectMapRight
	);
	const setPanelOpenDir = directorFun(
		direction,
		setPanelOpenLeft,
		setPanelOpenRight
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
		setDisplayedPanelIDLeft,
		setDisplayedPanelIDRight
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
	const setMapPagePositionDir = directorFun(
		direction,
		setMapPagePosition,
		setMapPagePositionRight
	);
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
		setBrushRangeLeft,
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

	const setPlotReadyDir = directorFun(
		direction,
		setPlotReadyLeft,
		setPlotReadyRight
	);

	const setMessengerDir = directorFun(
		direction,
		setMessengerLeft,
		setMessengerRight
	);
	return {setMessengerDir,
		messenger,
		plotReady,
		setPlotReadyDir,
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
