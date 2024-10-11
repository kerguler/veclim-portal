import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
	name: "page",
	initialState: {
		pageSelect: "albopictus",
	},
	reducers: {
		setPageSelect(state, action) {
			state.pageSelect = action.payload;
		},
	},
});

export const { setPageSelect } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
