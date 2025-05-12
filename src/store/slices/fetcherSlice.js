import { createSlice } from "@reduxjs/toolkit";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";

const fetcherSlice = createSlice({
	name: "fetcher",
	initialState: {
		fetcherStates: {
			readyToView: false,
			mapVector: "albopictus",
			vectorName: "albopictus",
			tileArray: ["colegg"],
			availableTiles: [],
			data: {},
			isTsDataSet: false,
			invalidateSimData: false,
			invalidateTsData: false,
			graphType: null,
			map: {
				displayTileNames: { left: false, right: false, center: true },

				currentMapCenter: [35.1966527, 33.3217152],
				currentMapZoom: 2,
				mapLoaded: false,
				leftMapLoaded: false,
				rightMapLoaded: false,

				switchMap: true,
				currentMapBounds: PackageMapServices.worldBounds,
				currentMaxBounds: PackageMapServices.worldBounds,
				userPosition: { lat: null, lng: null },
				globalPosition: { lat: null, lng: null },
				mapPagePosition: { lat: null, lng: null },
			},
			menu: {
				right: {
					directInit: false,
					panelOpen: false,
					mapMenuOpen: false,
					displayedPanelID: 0,
					interferePanelStyle: {},
					displaySimulationPanel: null,
					shimmered: false,

					directMap: { lon: null, lat: null, display: -2 },
					directInitError: { isError: false, message: "", type: "" },
					panel: { panelInterfere: 0, panelTop: 0 },
					chart: {
						chartParameters: {},
						shimmer: null,
						dataArrived: false,
						dates: { first: null, last: null },
						plotReady: false,
						requestPlot: false,
						sliders: { slider1: { enabled: true, value: 50 } },
						brush: {
							brushRange: { startIndex: null, endIndex: null },
							brushDatay: { min: 0, max: 0 },
							brushData: { min: 0, max: 0 },
						},

						messenger: { message: null, id: null, isError: false },
					},
				},
				left: {
					panelLevel: { path: [0, 0], level: 0, key: "menu_icon" },
					panel: { panelInterfere: 0, panelTop: 0 },
					shimmered: {},
					directInit: false,
					panelOpen: false,
					mapMenuOpen: false,
					interferePanelStyle: {},
					displaySimulationPanel: "",
					displayedPanelID: 0,
					directMap: { lon: null, lat: null, display: -2 },
					directInitError: { isError: false, message: "", type: "" },
					openItems: {},
					chart: {
						chartParameters: {},
						shimmer: {},
						dataArrived: false,
						brush: {
							brushRange: { startIndex: null, endIndex: null },
							brushDatay: { min: 0, max: 0 },
							brushData: { min: 0, max: 0 },
						},
						sliders: { slider1: { enabled: true, value: 50 } },

						dates: { first: null, last: null },
						plotReady: false,
						messenger: { message: null, id: null, isError: false },
					},
				},
			},
		},
		fetcherError: null,
		fetcherLoading: false,
	},

	reducers: {
		setShimmered(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].shimmered = value;
		},
		setDisplaySimulationPanel(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].displaySimulationPanel = value;
		},
		setPanelTop(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].panel.panelTop = value;
		},
		setDisplayTileNames(state, action) {
			state.fetcherStates.map.displayTileNames = action.payload;
		},
		appendToPlottedKeysChartParameters(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[
				direction
			].chart.chartParameters.plottedKeys.push(value);
		},
		appendToLabelsChartParameters(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.chartParameters.labels = [
				...state.fetcherStates.menu[direction].chart.chartParameters
					.labels,
				...value,
			];
		},
		appendToColorsChartParameters(state, action) {
			const { direction, value } = action.payload;

			state.fetcherStates.menu[direction].chart.chartParameters.colors = [
				...state.fetcherStates.menu[direction].chart.chartParameters
					.colors,
				...value,
			];
		},
		spliceChartParametersForSlices(state, action) {
			const { direction, value } = action.payload;
			let loc = state.fetcherStates.menu[
				direction
			].chart.chartParameters.plottedKeys.indexOf(
				state.fetcherStates.menu[direction].chart.chartParameters
					.lineSlice[value],
			);
			state.fetcherStates.menu[
				direction
			].chart.chartParameters.plottedKeys.splice(loc, 1);
			state.fetcherStates.menu[
				direction
			].chart.chartParameters.labels.splice(loc, 1);
			state.fetcherStates.menu[
				direction
			].chart.chartParameters.colors.splice(loc, 1);
		},
		setChartParameters(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.chartParameters = value;
		},
		setPanelInterfere(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].panel.panelInterfere = value;
		},
		setBrushRange(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.brush.brushRange = value;
		},
		setBrushData(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.brush.brushData = value;
		},
		setBrushDatay(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.brush.brushDatay = value;
		},

		setInterferePanelStyle(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].interferePanelStyle = value;
		},
		setOpenItems(state, action) {
			state.fetcherStates.menu.left.openItems = action.payload;
		},
		setPanelLevel(state, action) {
			state.fetcherStates.menu.left.panelLevel = action.payload;
		},

		setGraphType(state, action) {
			state.fetcherStates.graphType = action.payload;
		},

		setShimmer(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.shimmer = value;
		},

		setDataArrived(state, action) {
			const { direction, value } = action.payload;

			state.fetcherStates.menu[direction].chart.dataArrived = value;
		},

		setMessenger(state, action) {
			const { direction, value } = action.payload;

			state.fetcherStates.menu[direction].chart.messenger = value;
		},

		setInvalidateTsData(state, action) {
			state.fetcherStates.invalidateTsData = action.payload;
		},
		setInvalidateSimData(state, action) {
			state.fetcherStates.invalidateSimData = action.payload;
		},
		setIsTsDataSet(state, action) {
			state.fetcherStates.isTsDataSet = action.payload;
		},
		setTsData(state, action) {
			state.fetcherStates.data = action.payload;
		},
		setMapPagePosition(state, action) {
			state.fetcherStates.map.mapPagePosition = action.payload;
		},

		setSimSlider1Enabled(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.sliders.slider1.enabled =
				value;
		},

		setChartDates(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.dates = value;
		},

		setPlotReady(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.plotReady = value;
		},

		setAlboRequestPlot(state, action) {
			state.fetcherStates.menu.right.chart.requestPlot = action.payload;
		},
		setSimulationParameterSlider1(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].chart.sliders.slider1.value =
				value;
		},

		setReadyToView(state, action) {
			state.fetcherStates.readyToView = action.payload;
		},
		setVectorName(state, action) {
			state.fetcherStates.vectorName = action.payload;
		},
		setFetcherStates(state, action) {
			state.fetcherStates = action.payload;
		},
		setMapVector(state, action) {
			state.fetcherStates.mapVector = action.payload;
		},
		setTileArray(state, action) {
			state.fetcherStates.tileArray = action.payload;
		},
		setAvailableTiles(state, action) {
			state.fetcherStates.availableTiles = action.payload;
		},
		setCurrentMapCenter(state, action) {
			state.fetcherStates.map.currentMapCenter = action.payload;
		},
		setCurrentMapZoom(state, action) {
			state.fetcherStates.map.currentMapZoom = action.payload;
		},
		setMapLoaded(state, action) {
			state.fetcherStates.map.mapLoaded = action.payload;
		},
		setLeftMapLoaded(state, action) {
			state.fetcherStates.map.leftMapLoaded = action.payload;
		},
		setRightMapLoaded(state, action) {
			state.fetcherStates.map.rightMapLoaded = action.payload;
		},
		setSwitchMap(state, action) {
			state.fetcherStates.map.switchMap = action.payload;
		},
		setCurrentMapBounds(state, action) {
			state.fetcherStates.map.currentMapBounds = action.payload;
		},
		setCurrentMaxBounds(state, action) {
			state.fetcherStates.map.currentMaxBounds = action.payload;
		},
		setUserPosition(state, action) {
			state.fetcherStates.map.userPosition = action.payload;
		},
		setGlobalPosition(state, action) {
			if (action && action.payload) {
				state.fetcherStates.map.globalPosition = action.payload;
			} else {
				state.fetcherStates.map.globalPosition = state.userPosition;
			}
		},
		// setMapPagePosition(state, action) {
		// 	state.fetcherStates.map.mapPagePosition = action.payload;
		// },

		setDirectMap(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].directMap = value;
		},
		setDirectInit(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].directInit = value;
		},
		setDirectInitError(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].directInitError = value;
		},
		setPanelOpen(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].panelOpen = value;
		},
		setMapMenuOpen(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].mapMenuOpen = value;
		},
		setDisplayedPanelID(state, action) {
			const { direction, value } = action.payload;
			state.fetcherStates.menu[direction].displayedPanelID = value;
		},
	},
});

export const {
	setShimmered,
	setDisplaySimulationPanel,
	setPanelTop,
	setDisplayTileNames,
	appendToColorsChartParameters,
	appendToLabelsChartParameters,
	appendToPlottedKeysChartParameters,
	spliceChartParametersForSlices,
	setPanelInterfere,
	setChartParameters,
	setOpenItems,
	setInterferePanelStyle,
	setPanelLevel,
	setGraphType,
	setShimmer,
	setDataArrived,
	setMessenger,
	setInvalidateTsData,
	setInvalidateSimData,
	setIsTsDataSet,
	setTsData,
	setSimulationParameterSlider1,
	setSimSlider1Enabled,
	setAlboRequestPlot,
	setBrushRange,
	setBrushData,
	setBrushDatay,
	setChartDates,
	setCurrentMapBounds,
	setCurrentMapCenter,
	setCurrentMapZoom,
	setCurrentMaxBounds,
	setDirectInitError,
	setDirectInit,
	setDirectMap,
	setDisplayedPanelID,
	setFetcherStates,
	setGlobalPosition,
	setLeftMapLoaded,
	setMapLoaded,
	setMapMenuOpen,
	setMapPagePosition,
	setMapVector,
	setPanelOpen,
	setReadyToView,
	setRightMapLoaded,
	setSwitchMap,
	setTileArray,
	setUserPosition,
	setVectorName,
	setAvailableTiles,
	setPlotReady,
} = fetcherSlice.actions;
export const fetcherReducer = fetcherSlice.reducer;
