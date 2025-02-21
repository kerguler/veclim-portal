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
	setPanelLevel,
	setGraphType,
	setShimmerLeft,
	setShimmerRight,
	setDataArrivedLeft,
	setDataArrivedRight,
	setMessengerLeft,
	setMessengerRight,
	setInvalidateTsData,
	setInvalidateSimData,
	setTsData,
	setIsTsDataSet,
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
	fetcherReducer,
	setInterferePanelStyle,
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
	setShimmerLeft,
	setShimmerRight,
	setDataArrivedLeft,
	setDataArrivedRight,
	setMessengerLeft,
	setMessengerRight,
	setInvalidateTsData,
	setInvalidateSimData,
	setTsData,
	setIsTsDataSet,
	setMapPagePositionRight,
	setSlider1EnabledRight,
	setChartDatesLeft,
	setChartDatesRight,
	setPlotReadyLeft,
	setPlotReadyRight,
	setAlboRequestPlot,
	setAlboParamsSlider1Value,
	setPanelOpenRight,
	setDisplayedPanelIDRight,
	setRightMenuIconDisplay,
	setMapMenuOpenRight,
	setMapMenuOpenLeft,
	setDisplayedIconsRight,
	setVectorName,
	setFetcherStates,
	setAvailableTiles,
	setBrushRangeLeft,
	setBrushRangeRight,
	setCurrentMapBounds,
	setCurrentMaxBounds,
	setDirectInitLeft,
	setDirectInitRight,
	setDirectInitErrorLeft,
	setDirectInitErrorRight,
	setDirectMapLeft,
	setDirectMapRight,
	setDisplayedPanelIDLeft,
	setGlobalPosition,
	setLeftMapLoaded,
	setCurrentMapCenter,
	setMapLoaded,
	setMapPagePosition,
	setCurrentMapZoom,
	setMapVector,
	setPanelOpenLeft,
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
	setBrushDataRight,
	setPanelInterfereRight,
	setBrushDatayRight,
	setChartParametersRight,
	appendToPlottedKeysChartParametersRight,
	appendToLabelsChartParametersRight,
	appendToColorsChartParametersRight,
	spliceChartParametersForSlicesRight,
};
