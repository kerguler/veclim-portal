import { createSlice } from '@reduxjs/toolkit';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';

const fetcherSlice = createSlice({
  name: 'fetcher',
  initialState: {
    fetcherStates: {
      readyToView: false,
      mapVector: 'albopictus',
      vectorName: 'albopictus',
      tileArray: ['colegg'],
      availableTiles: [],
      data: {},
      isTsDataSet: false,
      invalidateSimData: false,
      invalidateTsData: false,
      graphType: null,
      map: {
        displayTileNames: { left: false, right: false, center: true },

        currentMapCenter: { lat: 35.1966527, lng: 33.3217152 },
        currentMapZoom: 2,
        mapLoaded: false,
        leftMapLoaded: false,
        rightMapLoaded: false,
        optionsPanel: {
          showVectorAbundance: false,
          tileOpacity: 1.0,
          showMapLabels: false,
        },
        switchMap: true,
        currentMapBounds: PackageMapServices.worldBounds,
        currentMaxBounds: PackageMapServices.worldBounds,
        userPosition: { lat: 35.19, lng: 33.32 },
        globalPosition: { lat: 35.19, lng: 33.32 },
        mapPagePosition: { lat: 35.19, lng: 33.32 },
      },
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

    setDisplayTileNames(state, action) {
      state.fetcherStates.map.displayTileNames = action.payload;
    },

    setGraphType(state, action) {
      state.fetcherStates.graphType = action.payload;
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
  },
});

export const {
  setShowVectorAbundance,
  setAvailableTiles,
  setCurrentMapBounds,
  setCurrentMapCenter,
  setCurrentMapZoom,
  setCurrentMaxBounds,
  setDisplayTileNames,
  setFetcherStates,
  setGlobalPosition,
  setGraphType,
  setInvalidateSimData,
  setInvalidateTsData,
  setIsTsDataSet,
  setLeftMapLoaded,
  setMapLoaded,
  setMapPagePosition,
  setMapVector,
  setReadyToView,
  setRightMapLoaded,
  setShowMapLabels,
  setSwitchMap,
  setTileArray,
  setTileOpacity,
  setTsData,
  setUserPosition,
  setVectorName,
} = fetcherSlice.actions;
export const fetcherReducer = fetcherSlice.reducer;
