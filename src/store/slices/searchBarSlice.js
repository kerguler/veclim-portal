import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
	name: 'search',
	initialState: {
		showSearchBar: false,
	},
	reducers: {
		setShowSearchBar(state, show) {
			state.showSearchBar = show.payload;
		},
		toggleShowSearchBar(state) {
			state.showSearchBar = !state.showSearchBar;
		},
	},
});

export const { setShowSearchBar, toggleShowSearchBar } = searchBarSlice.actions;
export const searchBarReducer = searchBarSlice.reducer;
