import { createSlice } from "@reduxjs/toolkit";

const fetcherSlice = createSlice({
	name: "fetcher",
	initialState: {
		fetcherStates: {
			readyToView: false,
			mapVector: "albopictus",
			vectorName: "albopictus",
			tileArray: ["colegg"],
			availableTiles: [],
			map: {
				currentMapCenter: [35.1966527, 33.3217152],
				currentMapZoom: 1,
				optionsPanel:{
					showVectorAbundance: false,
					tileOpacity: 1.0,
					showMapLabels: false},
				mapLoaded: false,
				leftMapLoaded: false,
				rightMapLoaded: false,
				leftMenu: {
					panelOpen: false,
					mapMenuOpen: false,
					displayedPanelID: 0,
				},
				switchMap: true,
				currentMapBounds: [],
				currentMaxBounds: [],
				userPosition: { lat: null, lng: null },
				globalPosition: { lat: null, lng: null },
				mapPagePosition: { lat: 35.1966527, lng: 33.3217152 },
			},
			brushRange: { startIndex: null, endIndex: null },
			directMap: { lon: null, lat: null, display: -2 },
			directInit: false,
			directInitError: { isError: false, message: "", type: "" },
		},
		fetcherError: null,
		fetcherLoading: false,
	},

		

	reducers: {
		setShowVectorAbundance(state, action) {
			state.fetcherStates.map.optionsPanel.showVectorAbundance = action.payload;
		},
		setTileOpacity(state, action) {
			state.fetcherStates.map.optionsPanel.tileOpacity = action.payload;
		},
		setShowMapLabels(state, action) {
			state.fetcherStates.map.optionsPanel.showMapLabels = action.payload;
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
			state.fetcherStates.map.globalPosition = action.payload;
		},
		setMapPagePosition(state, action) {
			state.fetcherStates.map.mapPagePosition = action.payload;
		},
		setBrushRange(state, action) {
			state.fetcherStates.brushRange = action.payload;
		},
		setDirectMap(state, action) {
			state.fetcherStates.directMap = action.payload;
		},
		setDirectInit(state, action) {
			state.fetcherStates.directInit = action.payload;
		},
		setDirectInitError(state, action) {
			state.fetcherStates.directInitError = action.payload;
		},
		setPanelOpen(state, action) {
			state.fetcherStates.map.leftMenu.panelOpen = action.payload;
		},
		setMapMenuOpen(state, action) {
			state.fetcherStates.map.leftMenu.mapMenuOpen = action.payload;
		},
		setDisplayedPanelID(state, action) {
			state.fetcherStates.map.leftMenu.displayedPanelID = action.payload;
		},
	},
});

export const {
	setVectorName,
	setShowVectorAbundance,
	setTileOpacity,
	setShowMapLabels,
	setFetcherStates,
	setAvailableTiles,
	setBrushRange,
	setCurrentMapBounds,
	setCurrentMaxBounds,
	setDirectInit,
	setDirectInitError,
	setDirectMap,
	setDisplayedPanelID,
	setGlobalPosition,
	setLeftMapLoaded,
	setCurrentMapCenter,
	setMapLoaded,
	setMapMenuOpen,
	setMapPagePosition,
	setCurrentMapZoom,
	setMapVector,
	setPanelOpen,
	setTileArray,
	setRightMapLoaded,
	setSwitchMap,
	setUserPosition,
	setReadyToView,
} = fetcherSlice.actions;
export const fetcherReducer = fetcherSlice.reducer;
