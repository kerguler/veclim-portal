import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coordinatesApi } from "./apis/coordinatesApi";
import { timeSeriesApi } from "./apis/timeSeriesApi";
import { colorBarsApi } from "./apis/colorBarsApi";
import { alboApi } from "./apis/alboApi";
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
	setOpenItems,
	setChartParameters,
	setPanelInterfere,
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
	fetcherReducer,
	appendToColorsChartParameters,
	appendToLabelsChartParameters,
	appendToPlottedKeysChartParameters,
	spliceChartParametersForSlices,
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
	setSuperUser,
	setPageTransition,
	setDividerPosition,
} from "./slices/searchLocationSlice";

import {
	panelReducer,
	setPanelTop,
	setDisplayTileNames,
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
			.concat(simulationApi.middleware)
			.concat(alboApi.middleware); //.concat(logger);
	},
});
setupListeners(store.dispatch);
export { useFetchCoordinateDataQuery } from "./apis/coordinatesApi";
export {
	useSubmitAlboDataMutation,
	useFetchSimStatusQuery,
	useListenToSimUpdatesQuery,
} from "./apis/alboApi";
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
	setDisplayedIconsRight,
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
	setSwitcherArrowsRight,
	setTwinArrayRight,
	setTwinIndexRight,
	setTwinsNotDisplayedRight,
	setSwitcherRight,
};
