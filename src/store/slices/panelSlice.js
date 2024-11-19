import { createSlice } from "@reduxjs/toolkit";

const panelSlice = createSlice({
	name: "panel",
	initialState: {
		chartParameters: {},
		chartParametersRight: {},
		panelTop: 0,
		panelInterfere: 0,
		panelInterfereRight: null,
		brushData: { min: 0, max: 0 },
		brushDataRight: { min: 0, max: 0 },
		brushDatay: { min: 0, max: 0 },
		brushDatayRight: { min: 0, max: 0 },

		displayTileNames: { left: false, right: false, center: true },
	},

	reducers: {
		setPanelInterfere(state, action) {
			state.panelInterfere = action.payload;
		},
		setPanelInterfereRight(state, action) {
			state.panelInterfereRight = action.payload;
		},
		setChartParameters(state, action) {
			state.chartParameters = { ...action.payload };
		},

		setChartParametersRight(state, action) {
			state.chartParametersRight = { ...action.payload };
		},

		setBrushDatay(state, action) {
			state.brushDatay = action.payload;
		},

		setBrushDatayRight(state, action) {
			state.brushDatayRight = action.payload;
		},

		setBrushData(state, action) {
			state.brushData = action.payload;
		},
		setBrushDataRight(state, action) {
			state.brushDataRight = action.payload;
		},

		setDisplayTileNames(state, action) {
			state.displayTileNames = action.payload;
		},

		setPanelTop(state, action) {
			state.panelTop = action.payload;
		},

		appendToPlottedKeysChartParametersRight(state, action) {
			state.chartParametersRight.plottedKeys.push(action.payload);
		},
		appendToPlottedKeysChartParameters(state, action) {
			state.chartParameters.plottedKeys.push(action.payload);
		},
		appendToLabelsChartParametersRight(state, action) {
			state.chartParametersRight.labels = [
				...state.chartParametersRight.labels,
				...action.payload,
			];
		},

		appendToLabelsChartParameters(state, action) {
			state.chartParameters.labels = [
				...state.chartParameters.labels,
				...action.payload,
			];
		},
		appendToColorsChartParametersRight(state, action) {
			state.chartParametersRight.colors = [
				...state.chartParametersRight.colors,
				...action.payload,
			];
		},
		appendToColorsChartParameters(state, action) {
			state.chartParameters.colors = [
				...state.chartParameters.colors,
				...action.payload,
			];
		},
		spliceChartParametersForSlicesRight(state, action) {
			let loc = state.chartParametersRight.plottedKeys.indexOf(
				state.chartParametersRight.lineSlice[action.payload]
			);
			state.chartParametersRight.plottedKeys.splice(loc, 1);
			state.chartParametersRight.labels.splice(loc, 1);
			state.chartParametersRight.colors.splice(loc, 1);
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
	setChartParametersRight,
	setBrushDataRight,
	setBrushDatayRight,
	spliceChartParametersForSlicesRight,
	appendToPlottedKeysChartParametersRight,
	appendToLabelsChartParametersRight,
	appendToColorsChartParametersRight,
	setPanelInterfereRight,
	setChartParameters,
	appendToPlottedKeysChartParameters,
	appendToLabelsChartParameters,
	appendToColorsChartParameters,
	spliceChartParametersForSlices,
	setPanelInterfere,
	setPanelTop,
	setBrushData,
	setDisplayTileNames,
	setBrushDatay,
} = panelSlice.actions;
export const panelReducer = panelSlice.reducer;
