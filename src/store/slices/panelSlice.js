import { createSlice } from "@reduxjs/toolkit";

const panelSlice = createSlice({
	name: "panel",
	initialState: {
		panelTop: 0,
		panelInterfere: 0,
		panelInterfereRight: null,

		displayTileNames: { left: false, right: false, center: true },
	},

	reducers: {
		setDisplayTileNames(state, action) {
			state.displayTileNames = action.payload;
		},

		setPanelTop(state, action) {
			state.panelTop = action.payload;
		},
	},
});

export const {
	setPanelTop,

	setDisplayTileNames,
} = panelSlice.actions;
export const panelReducer = panelSlice.reducer;
