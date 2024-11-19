import { createSlice } from "@reduxjs/toolkit";

const graphSwitcherSlice = createSlice({
	name: "graphSwitch",
	initialState: {
		switcher: false,
		switcherRight: false,
		twinsNotDisplayedRight: [],
		twinsNotDisplayed: [],
		twinIndex: 0,
		twinIndexRight: 0,
		twinArrayRight: [],
		twinArray: [],
		switcherArrows: { left: false, right: false },
		switcherArrowsRight: { left: false, right: false },
		displayedIcons: [{ id: null, panelArray: [] }],
		displayedIconsRight: [{ id: null, panelArray: [] }],
	},
	reducers: {
		setSwitcher(state, action) {
			state.switcher = action.payload;
		},
		setSwitcherRight(state, action) {
			state.switcherRight = action.payload;
		},
		setTwinsNotDisplayed(state, action) {
			state.twinsNotDisplayed = action.payload;
		},

		setTwinsNotDisplayedRight(state, action) {
			state.twinsNotDisplayedRight = action.payload;
		},

		setTwinIndex(state, action) {
			state.twinIndex = action.payload;
		},
		setTwinIndexRight(state, action) {
			state.twinIndexRight = action.payload;
		},
		setTwinArray(state, action) {
			state.twinArray = action.payload;
		},

		setTwinArrayRight(state, action) {
			state.twinArrayRight = action.payload;
		},

		setSwitcherArrows(state, action) {
			state.switcherArrows = action.payload;
		},

		setDisplayedIconsRight(state, action) {
			state.displayedIconsRight = action.payload;
		},
		setSwitcherArrowsRight(state, action) {
			state.switcherArrowsRight = action.payload;
		},

		setDisplayedIcons(state, action) {
			state.displayedIcons = action.payload;
		},
	},
});

export const {
	setSwitcher,
	setTwinsNotDisplayed,
	setTwinIndex,
	setTwinArray,
	setSwitcherArrows,
	setDisplayedIcons,
	setSwitcherRight,
	setTwinsNotDisplayedRight,
	setTwinIndexRight,
	setTwinArrayRight,
	setSwitcherArrowsRight,
	setDisplayedIconsRight,
} = graphSwitcherSlice.actions;
export const graphSwitcherReducer = graphSwitcherSlice.reducer;
