import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { coordinatesApi } from './apis/coordinatesApi';
import { timeSeriesApi } from './apis/timeSeriesApi_new';
import { colorBarsApi } from './apis/colorBarsApi';
import { alboApi } from './apis/alboApi';
import { searchBarReducer, setShowSearchBar, toggleShowSearchBar } from './slices/searchBarSlice';
import {
  setNews,
  setPreloadedImages,
  setDisplayReady,
  setDisplayedArticleId,
  setReadMore,
  setRotateShow,
  newsReducer,
  setTimer,
  clearTimer,
} from './slices/newsSlice';
import {
  setAvailableTiles,
  setCurrentMapBounds,
  setCurrentMapCenter,
  setCurrentMapZoom,
  setCurrentMaxBounds,
  setDisplayTileNames,
  setFetcherStates,
  setGlobalPosition,
  setLeftMapLoaded,
  setMapLoaded,
  setMapPagePosition,
  setMapVector,
  setRightMapLoaded,
  setSwitchMap,
  setTileArray,
  setUserPosition,
  setGraphType,
  setInvalidateSimData,
  setInvalidateTsData,
  setIsTsDataSet,
  setReadyToView,
  setShowMapLabels,
  setShowVectorAbundance,
  setTileOpacity,
  setTsData,
  setVectorName,
  fetcherReducer,
} from './slices/fetcherSlice';

import {
  setLastPanelDisplayed,
  mapMenuReducer,
  setAlboRequestPlot,
  setBrushData,
  setBrushDatay,
  setBrushDatayLeft,
  setBrushDatayRight,
  setBrushRange,
  setChartDates,
  setChartParameters,
  setDataArrived,
  setDirectInit,
  setDirectInitError,
  setDirectMap,
  setDisplaySimulationPanel,
  setDisplayedPanelID,
  setInterferePanelStyle,
  setMapMenuOpen,
  setMessenger,
  setOpenItems,
  setPanelInterfere,
  setPanelLevel,
  setPanelOpen,
  setPanelTop,
  setPlotReady,
  setShimmer,
  setShimmered,
  setSimSlider1Enabled,
  setSimulationParameterSlider1,
  setYaxisInfo,
  appendToColorsChartParameters,
  appendToLabelsChartParameters,
  appendToPlottedKeysChartParameters,
  spliceChartParametersForSlices,
} from 'components/mapMenu/menuStore/mapMenuSlice';

import { languageReducer, changeLanguage } from './slices/languageSlice';
import {
  setTwinArray,
  setTwinIndex,
  setTwinsNotDisplayed,
  setSwitcher,
  setDisplayedIcons,
  setSwitcherArrows,
  graphSwitcherReducer,
} from './slices/switcherSlice';
import { vectorSelectorReducer } from './slices/vectorSelectorSlice';
import { pageReducer, setPageSelect } from './slices/pageSlice';
import {
  setUsername,
  setPassword,
  setRememberLogin,
  setDetails,
  loginReducer,
  setCsrfToken,
  setApiRegisterResponse,
} from './slices/loginSlice';
import {
  setTitle,
  setDescription,
  setSimList,
  addSimulation,
  deleteSimulation,
  modifySimulation,
  setEditedSimulation,
  setAddedSimulation,
  simulationReducer,
  setParsedJson,
} from './slices/simulationSlice';
import {
  setLocationRequested,
  setShowInstructions,
  searchLocationReducer,
  changeDate,
  changeSearchTermLocation,
  populateArray,
  setSuperUser,
  setPageTransition,
  setDividerPosition,
} from './slices/searchLocationSlice';

import { loginRegisterApi } from './apis/loginRegisterApi';

import {
  setTimeSeriesDates,
  setBlinkers,
  setUser,
  dashboardReducer,
} from './slices/dashboardSlice';

import { newsApi } from './apis/newsApi';
import { simulationApi } from './apis/simulationApi';

export const store = configureStore({
  reducer: {
    [coordinatesApi.reducerPath]: coordinatesApi.reducer,
    [timeSeriesApi.reducerPath]: timeSeriesApi.reducer,
    [colorBarsApi.reducerPath]: colorBarsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [loginRegisterApi.reducerPath]: loginRegisterApi.reducer,
    [simulationApi.reducerPath]: simulationApi.reducer,
    [alboApi.reducerPath]: alboApi.reducer,
    login: loginReducer,
    dashboard: dashboardReducer,
    simulation: simulationReducer,
    location: searchLocationReducer,
    searchBar: searchBarReducer,
    language: languageReducer,
    vector: vectorSelectorReducer,
    page: pageReducer,
    graphSwitch: graphSwitcherReducer,
    fetcher: fetcherReducer,
    news: newsReducer,
    mapMenu: mapMenuReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(coordinatesApi.middleware)
      .concat(timeSeriesApi.middleware)
      .concat(colorBarsApi.middleware)
      .concat(newsApi.middleware)
      .concat(loginRegisterApi.middleware)
      .concat(simulationApi.middleware)
      .concat(alboApi.middleware); //.concat(logger);
  },
});
setupListeners(store.dispatch);
export { useFetchCoordinateDataQuery } from './apis/coordinatesApi';
export {
  useSubmitAlboDataMutation,
  useFetchSimStatusQuery,
  useListenToSimUpdatesQuery,
} from './apis/alboApi';
export { useFetchTimeSeriesDataQuery, useFetchTSDateRangeQuery } from './apis/timeSeriesApi_new';
export { useFetchColorBarsDataQuery } from './apis/colorBarsApi';
export {
  useLoginMutation,
  useRegisterMutation,
  useLoginWithTokenMutation,
  useFetchCsrfQuery,
  useLogoutMutation,
} from './apis/loginRegisterApi';

export {
  useGetSimulationListQuery,
  useCreateSimulationMutation,
  useDeleteSimulationMutation,
  useEditSimulationMutation,
  useRunSimulationMutation,
  useLazyGetSimulationListQuery,
} from './apis/simulationApi';

export { useFetchNewsDataQuery } from './apis/newsApi';
export {
  setShimmered,
  setDisplaySimulationPanel,
  setOpenItems,
  setInterferePanelStyle,
  setPanelLevel,
  setGraphType,
  setShimmer,
  setDataArrived,
  setMessenger,
  setInvalidateTsData,
  setInvalidateSimData,
  setTsData,
  setIsTsDataSet,
  setSimSlider1Enabled,
  setChartDates,
  setPlotReady,
  setAlboRequestPlot,
  setSimulationParameterSlider1,
  setPanelOpen,
  setDisplayedPanelID,
  setMapMenuOpen,
  setVectorName,
  setFetcherStates,
  setAvailableTiles,
  setBrushRange,
  setCurrentMapBounds,
  setCurrentMaxBounds,
  setDirectInit,
  setDirectInitError,
  setDirectMap,
  setGlobalPosition,
  setLeftMapLoaded,
  setCurrentMapCenter,
  setMapLoaded,
  setMapPagePosition,
  setCurrentMapZoom,
  setMapVector,
  setTileArray,
  setRightMapLoaded,
  setSwitchMap,
  setUserPosition,
  setReadyToView,
  setDisplayReady,
  setDisplayedArticleId,
  setReadMore,
  setRotateShow,
  setPreloadedImages,
  setNews,
  changeLanguage,
  setLocationRequested,
  setShowInstructions,
  changeDate,
  changeSearchTermLocation,
  populateArray,
  setShowSearchBar,
  toggleShowSearchBar,
  setSuperUser,
  setChartParameters,
  appendToPlottedKeysChartParameters,
  appendToLabelsChartParameters,
  appendToColorsChartParameters,
  spliceChartParametersForSlices,
  setPageSelect,
  setPanelInterfere,
  setPanelTop,
  setPageTransition,
  setBrushData,
  setDisplayTileNames,
  setDividerPosition,
  setSwitcher,
  setTwinsNotDisplayed,
  setSwitcherArrows,
  setTwinArray,
  setTwinIndex,
  setDisplayedIcons,
  setBrushDatay,
  setApiRegisterResponse,
  setCsrfToken,
  setDetails,
  setPassword,
  setRememberLogin,
  setUsername,
  setTitle,
  setDescription,
  setSimList,
  addSimulation,
  deleteSimulation,
  modifySimulation,
  setEditedSimulation,
  setAddedSimulation,
  setParsedJson,
  setTimeSeriesDates,
  setBlinkers,
  setUser,
  setTimer,
  clearTimer,
  setBrushDatayLeft,
  setBrushDatayRight,
  setYaxisInfo,
  setShowMapLabels,
  setShowVectorAbundance,
  setTileOpacity,
  setLastPanelDisplayed,
};
