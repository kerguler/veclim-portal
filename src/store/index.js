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
	setTimer,clearTimer
} from "./slices/newsSlice";
import {setOpenItems,setPanelLevel,setGraphType,setShimmer,setShimmered,setDisplaySimulationPanel,
	fetcherReducer,setPlotReady,setInterferePanelStyle,
	setFetcherStates,setDataArrived,setMessenger,setSimSlider1Enabled,
	setAvailableTiles,setAlboRequestPlot,
	setCurrentMapBounds,
	setCurrentMaxBounds,setPanelInterfere,
	setDirectInit,
	setDirectInitError,
	setDirectMap,
	setDisplayedPanelID,setBrushData,setBrushRange,
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
	setVectorName,appendToColorsChartParameters,appendToLabelsChartParameters,appendToPlottedKeysChartParameters,spliceChartParametersForSlices,
	setReadyToView,setChartParameters
} from "./slices/fetcherSlice";
import { languageReducer, changeLanguage } from "./slices/languageSlice";
import {
	setTwinArray,
	setTwinIndex,
	graphSwitcherReducer,
	setTwinsNotDisplayed,
	setSwitcher,
	setSwitcherArrows,
	setDisplayedIcons,
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
import logger from "redux-logger";
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
	setOffsetValue,
	setRefPoint,
	setForeGroundDrag,
	setBackgroundColor,
	setForegroundColor,
	setInitialSize,
	setIsDragging,
	setPadPositions,
	setRange,
	setLimits,
	sliderReducer,
	setActiveRange,
	setArrowColors,
	foreGroundMove,
	bottomPadMove,
	topPadMove,
	stopAllDrag,
} from "./slices/sliderSlice";
import {
	panelReducer,
	// setChartParameters,
	
	setPanelTop,
	setDisplayTileNames,
	setBrushDataYL,
	setBrushDataYR,
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
		slider: sliderReducer,
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
export {setOpenItems,setPanelLevel,setGraphType,setPlotReady,setShimmer,setShimmered,setInterferePanelStyle,
	setDisplayReady,setDisplaySimulationPanel,
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
	setRange,
	setInitialSize,
	setOffsetValue,
	setIsDragging,
	setPadPositions,
	setLimits,
	setForegroundColor,
	setBackgroundColor,
	setForeGroundDrag,
	setRefPoint,
	setPanelTop,
	setActiveRange,
	setArrowColors,
	foreGroundMove,
	bottomPadMove,
	topPadMove,
	stopAllDrag,
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
	setBrushDataYL,
	setBrushDataYR,
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
	setTimer,clearTimer,setDataArrived,setMessenger,setSimSlider1Enabled,setAlboRequestPlot
};
