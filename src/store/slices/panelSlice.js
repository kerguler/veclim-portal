import { createSlice } from "@reduxjs/toolkit";

const panelSlice = createSlice({
	name: "panel",
	initialState: {
		displayedPanelID: 0,
		panelOpen: false,
		mapMenuOpen: false,
		brushRange: { startIndex: null, endIndex: null },
		chartParameters: {},
		panelTop: 0,
		panelInterfere: 0,
		brushData: null,
		brushDatay: { min: 0, max: 0 },
		displayTileNames: { left: false, right: false, center: true },
	},

	reducers: {
		setBrushDatay(state, action) {
			state.brushDatay = action.payload;
		},
		setBrushRange(state, action) {
			state.brushRange = { ...action.payload };
		},
		setDisplayTileNames(state, action) {
			state.displayTileNames = action.payload;
		},
		setBrushData(state, action) {
			state.brushData = action.payload;
		},
		setPanelTop(state, action) {
			state.panelTop = action.payload;
		},
		setPanelInterfere(state, action) {
			state.panelInterfere = action.payload;
		},
		setDisplayedPanelID(state, action) {
			state.displayedPanelID = action.payload;
		},
		setPanelOpen(state, action) {
			state.panelOpen = action.payload;
		},
		setMapMenuOpen(state, action) {
			state.mapMenuOpen = action.payload;
		},
		setBrushRange(state, action) {
			state.brushRange = { ...action.payload };
		},
		setChartParameters(state, action) {
			state.chartParameters = { ...action.payload };
		},
		appendToPlottedKeysChartParameters(state, action) {
			state.chartParameters.plottedKeys.push(action.payload);
		},
		appendToLabelsChartParameters(state, action) {
			state.chartParameters.labels = [
				...state.chartParameters.labels,
				...action.payload,
			];
		},
		appendToColorsChartParameters(state, action) {
			state.chartParameters.colors = [
				...state.chartParameters.colors,
				...action.payload,
			];
		},
		spliceChartParametersForSlices(state, action) {
			let loc = state.chartParameters.plottedKeys.indexOf(
				state.chartParameters.lineSlice[action.payload]
			);
			state.chartParameters.plottedKeys.splice(loc, 1);
			state.chartParameters.labels.splice(loc, 1);
			state.chartParameters.colors.splice(loc, 1);
		},
	},
});

export const {
	setDisplayedPanelID,
	setPanelOpen,
	setMapMenuOpen,
	setBrushRange,
	setChartParameters,
	appendToPlottedKeysChartParameters,
	appendToLabelsChartParameters,
	appendToColorsChartParameters,
	spliceChartParametersForSlices,
	setPanelInterfere,
	setPanelTop,
	setBrushData,
	setDisplayTileNames,setBrushDatay
} = panelSlice.actions;
export const panelReducer = panelSlice.reducer;
