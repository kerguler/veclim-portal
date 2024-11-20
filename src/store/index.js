import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coordinatesApi } from "./apis/coordinatesApi";
import { timeSeriesApi } from "./apis/timeSeriesApi";
import { colorBarsApi } from "./apis/colorBarsApi";
import {
	searchBarReducer,
	setShowSearchBar,
	toggleShowSearchBar,
} from "./slices/searchBarSlice";
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
} from "./slices/newsSlice";
import {
	setDirectInit,
	setDirectInitRight,
	setDirectMap,
	setDirectMapRight,
	setDisplayedPanelID,
	setRightDisplayedPanelID,
	setPanelOpen,
	setRightPanelOpen,
	setMapMenuOpen,
	setRightMapMenuOpen,
	setBrushRange,
	setBrushRangeRight,
	setMapPagePosition,
	setMapVector,
	setCurrentMapZoom,
	setMapLoaded,
	setRightMapLoaded,
	setSwitchMap,
	setTileArray,
	setVectorName,
	setReadyToView,
	setRightMenuIconDisplay,
	setFetcherStates,
	setAvailableTiles,
	setCurrentMapBounds,
	setLeftMapLoaded,
	setCurrentMapCenter,
	setCurrentMaxBounds,
	setDirectInitError,
	fetcherReducer,
	setAlboParamsSlider1Value,
} from "./slices/fetcherSlice";
import { languageReducer, changeLanguage } from "./slices/languageSlice";
import {
	setTwinArray,
	setTwinArrayRight,
	setTwinIndex,
	setTwinIndexRight,
	setTwinsNotDisplayed,
	setTwinsNotDisplayedRight,
	setSwitcher,
	setSwitcherRight,
	setDisplayedIcons,
	setDisplayedIconsRight,
	setSwitcherArrows,
	setSwitcherArrowsRight,
	graphSwitcherReducer,
} from "./slices/switcherSlice";
import { vectorSelectorReducer } from "./slices/vectorSelectorSlice";
import { pageReducer, setPageSelect } from "./slices/pageSlice";
import {
	setUsername,
	setPassword,
	setRememberLogin,
	setDetails,
	loginReducer,
	setCsrfToken,
	setApiRegisterResponse,
} from "./slices/loginSlice";
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
} from "./slices/simulationSlice";
import {
	setLocationRequested,
	setShowInstructions,
	searchLocationReducer,
	changeDate,
	changeSearchTermLocation,
	populateArray,
	setGlobalPosition,
	setUserPosition,
	setSuperUser,
	setPageTransition,
	setDividerPosition,
} from "./slices/searchLocationSlice";

import {
	panelReducer,
	setChartParameters,
	setChartParametersRight,
	appendToPlottedKeysChartParameters,
	appendToPlottedKeysChartParametersRight,
	appendToLabelsChartParameters,
	appendToLabelsChartParametersRight,
	appendToColorsChartParameters,
	appendToColorsChartParametersRight,
	spliceChartParametersForSlices,
	spliceChartParametersForSlicesRight,
	setPanelInterfere,
	setPanelInterfereRight,
	setPanelTop,
	setBrushData,
	setBrushDataRight,
	setDisplayTileNames,
	setBrushDatay,
	setBrushDatayRight,
} from "./slices/panelSlice";
import { loginRegisterApi } from "./apis/loginRegisterApi";

import {
	setTimeSeriesDates,
	setBlinkers,
	setUser,
	dashboardReducer,
} from "./slices/dashboardSlice";

import { newsApi } from "./apis/newsApi";
import { simulationApi } from "./apis/simulationApi";

import { composeWithDevTools } from "redux-devtools-extension";
export const store = configureStore({
	reducer: {
		[coordinatesApi.reducerPath]: coordinatesApi.reducer,
		[timeSeriesApi.reducerPath]: timeSeriesApi.reducer,
		[colorBarsApi.reducerPath]: colorBarsApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		[loginRegisterApi.reducerPath]: loginRegisterApi.reducer,
		[simulationApi.reducerPath]: simulationApi.reducer,
		login: loginReducer,
		dashboard: dashboardReducer,
		simulation: simulationReducer,
		location: searchLocationReducer,
		searchBar: searchBarReducer,
		language: languageReducer,
		panel: panelReducer,
		vector: vectorSelectorReducer,
		page: pageReducer,
		graphSwitch: graphSwitcherReducer,
		fetcher: fetcherReducer,
		news: newsReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(coordinatesApi.middleware)
			.concat(timeSeriesApi.middleware)
			.concat(colorBarsApi.middleware)
			.concat(newsApi.middleware)
			.concat(loginRegisterApi.middleware)
			.concat(simulationApi.middleware); //.concat(logger);
	},
});
setupListeners(store.dispatch);
export { useFetchCoordinateDataQuery } from "./apis/coordinatesApi";
export {
	useFetchTimeSeriesDataQuery,
	useFetchTSDateRangeQuery,
} from "./apis/timeSeriesApi";
export { useFetchColorBarsDataQuery } from "./apis/colorBarsApi";
export {
	useLoginMutation,
	useRegisterMutation,
	useLoginWithTokenMutation,
	useFetchCsrfQuery,
	useLogoutMutation,
} from "./apis/loginRegisterApi";

export {
	useGetSimulationListQuery,
	useCreateSimulationMutation,
	useDeleteSimulationMutation,
	useEditSimulationMutation,
	useRunSimulationMutation,
} from "./apis/simulationApi";

export { useFetchNewsDataQuery } from "./apis/newsApi";
export {
	setDisplayReady,
	setDisplayedArticleId,
	setReadMore,
	setRotateShow,
	setPreloadedImages,
	setNews,
	setFetcherStates,
	changeLanguage,
	setLocationRequested,
	setShowInstructions,
	changeDate,
	changeSearchTermLocation,
	populateArray,
	setGlobalPosition,
	setUserPosition,
	setShowSearchBar,
	toggleShowSearchBar,
	setBrushRange,
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
	setAlboParamsSlider1Value,
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
	setAvailableTiles,
	setCurrentMapBounds,
	setCurrentMaxBounds,
	setDirectInit,
	setDirectInitError,
	setDirectMap,
	setDisplayedPanelID,
	setLeftMapLoaded,
	setCurrentMapCenter,
	setMapLoaded,
	setMapMenuOpen,
	setMapPagePosition,
	setMapVector,
	setCurrentMapZoom,
	setPanelOpen,
	setRightMapLoaded,
	setSwitchMap,
	setTileArray,
	setVectorName,
	setReadyToView,
	setTimer,
	clearTimer,
	setRightDisplayedPanelID,
	setRightPanelOpen,
	setRightMenuIconDisplay,
	setRightMapMenuOpen,
	setSwitcherArrowsRight,
	setTwinArrayRight,
	setTwinIndexRight,
	setTwinsNotDisplayedRight,
	setSwitcherRight,
	setDisplayedIconsRight,
	setBrushDataRight,
	setPanelInterfereRight,
	setBrushDatayRight,
	setChartParametersRight,
	appendToPlottedKeysChartParametersRight,
	appendToLabelsChartParametersRight,
	appendToColorsChartParametersRight,
	spliceChartParametersForSlicesRight,
	setBrushRangeRight,
	setDirectInitRight,
	setDirectMapRight,
};
