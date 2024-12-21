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
			map: {
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
				mapPagePosition: { lat: 35.1966527, lng: 33.3217152 },
				mapPagePositionRight: { lat: 35.1966527, lng: 33.3217152 },
			},
			menu: {
				right: {
					directInit: false,
					menuIconDisplay: true,
					panelOpen: false,
					mapMenuOpen: false,
					displayedPanelID: 0,
					directMap: { lon: null, lat: null, display: -2 },
					directInitError: { isError: false, message: "", type: "" },
					chart: {
						dates: { first: null, last: null },
						plotReady: false,
						requestPlot: false,
						sliders: { slider1: { enabled: true, value: 50 } },
						brushRange: { startIndex: null, endIndex: null },
						messenger: { message: null, id: null, isError: false },
					},
				},
				left: {
					directInit: false,
					panelOpen: false,
					mapMenuOpen: false,
					displayedPanelID: 0,
					directMap: { lon: null, lat: null, display: -2 },
					directInitError: { isError: false, message: "", type: "" },
					chart: {
						brushRange: { startIndex: null, endIndex: null },
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
		setMessengerLeft(state, action) {
			state.fetcherStates.menu.left.chart.messenger = action.payload;
		},
		setMessengerRight(state, action) {
			state.fetcherStates.menu.right.chart.messenger = action.payload;
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
		setMapPagePositionRight(state, action) {
			state.fetcherStates.map.mapPagePositionRight = action.payload;
		},
		setSlider1EnabledRight(state, action) {
			state.fetcherStates.menu.right.chart.sliders.slider1.enabled =
				action.payload;
		},
		setChartDatesLeft(state, action) {
			state.fetcherStates.menu.left.chart.dates = action.payload;
		},
		setChartDatesRight(state, action) {
			state.fetcherStates.menu.right.chart.dates = action.payload;
		},
		setPlotReadyLeft(state, action) {
			state.fetcherStates.menu.left.chart.plotReady = action.payload;
		},
		setPlotReadyRight(state, action) {
			state.fetcherStates.menu.right.chart.plotReady = action.payload;
		},
		setAlboRequestPlot(state, action) {
			state.fetcherStates.menu.right.chart.requestPlot = action.payload;
		},
		setAlboParamsSlider1Value(state, action) {
			state.fetcherStates.menu.right.chart.sliders.slider1.value =
				action.payload;
		},
		setRightMenuIconDisplay(state, action) {
			state.fetcherStates.menu.right.menuIconDisplay = action.payload;
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
		setMapPagePosition(state, action) {
			state.fetcherStates.map.mapPagePosition = action.payload;
		},
		setBrushRangeLeft(state, action) {
			state.fetcherStates.menu.left.chart.brushRange = action.payload;
		},
		setBrushRangeRight(state, action) {
			state.fetcherStates.menu.right.chart.brushRange = action.payload;
		},

		setDirectMapLeft(state, action) {
			state.fetcherStates.menu.left.directMap = action.payload;
		},
		setDirectMapRight(state, action) {
			state.fetcherStates.menu.right.directMap = action.payload;
		},
		setDirectInitLeft(state, action) {
			state.fetcherStates.menu.left.directInit = action.payload;
		},
		setDirectInitRight(state, action) {
			state.fetcherStates.menu.right.directInit = action.payload;
		},
		setDirectInitErrorLeft(state, action) {
			state.fetcherStates.menu.left.directInitError = action.payload;
		},
		setDirectInitErrorRight(state, action) {
			state.fetcherStates.menu.right.directInitError = action.payload;
		},
		setPanelOpenLeft(state, action) {
			state.fetcherStates.menu.left.panelOpen = action.payload;
		},
		setPanelOpenRight(state, action) {
			state.fetcherStates.menu.right.panelOpen = action.payload;
		},
		setMapMenuOpenLeft(state, action) {
			state.fetcherStates.menu.left.mapMenuOpen = action.payload;
		},
		setMapMenuOpenRight(state, action) {
			state.fetcherStates.menu.right.mapMenuOpen = action.payload;
		},
		setDisplayedPanelIDLeft(state, action) {
			state.fetcherStates.menu.left.displayedPanelID = action.payload;
		},
		setDisplayedPanelIDRight(state, action) {
			state.fetcherStates.menu.right.displayedPanelID = action.payload;
		},
	},
});

export const {
	setMessengerLeft,
	setMessengerRight,
	setInvalidateTsData,
	setInvalidateSimData,
	setIsTsDataSet,
	setTsData,
	setMapPagePositionRight,
	setAlboParamsSlider1Value,
	setAlboRequestPlot,
	setBrushRangeLeft,
	setBrushRangeRight,
	setChartDatesLeft,
	setChartDatesRight,
	setCurrentMapBounds,
	setCurrentMapCenter,
	setCurrentMapZoom,
	setCurrentMaxBounds,
	setDirectInitErrorLeft,
	setDirectInitErrorRight,
	setDirectInitLeft,
	setDirectInitRight,
	setDirectMapLeft,
	setDirectMapRight,
	setDisplayedPanelIDLeft,
	setDisplayedPanelIDRight,
	setFetcherStates,
	setGlobalPosition,
	setLeftMapLoaded,
	setMapLoaded,
	setMapMenuOpenLeft,
	setMapMenuOpenRight,
	setMapPagePosition,
	setMapVector,
	setPanelOpenLeft,
	setPanelOpenRight,
	setReadyToView,
	setRightMapLoaded,
	setSlider1EnabledRight,
	setSwitchMap,
	setTileArray,
	setUserPosition,
	setVectorName,
	setAvailableTiles,
	setPlotReadyLeft,
	setPlotReadyRight,
	setRightMenuIconDisplay,
} = fetcherSlice.actions;
export const fetcherReducer = fetcherSlice.reducer;
