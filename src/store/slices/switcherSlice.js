import { createSlice } from '@reduxjs/toolkit';

const graphSwitcherSlice = createSlice({
	name: 'graphSwitch',
	initialState: {
		left: {
			switcher: false,
			twinsNotDisplayed: [],
			twinIndex: 0,
			twinArray: [],
			switcherArrows: { left: false, right: false },
			displayedIcons: [{ id: null, panelArray: [] }],
		},
		right: {
			switcher: false,
			twinsNotDisplayed: [],
			twinIndex: 0,
			twinArray: [],
			switcherArrows: { left: false, right: false },
			displayedIcons: [{ id: null, panelArray: [] }],
		},
	},
	reducers: {
		setSwitcher(state, action) {
			const { direction, value } = action.payload;
			state[direction].switcher = value;
		},

		setTwinsNotDisplayed(state, action) {
			const { direction, value } = action.payload;
			state[direction].twinsNotDisplayed = value;
		},

		setTwinIndex(state, action) {
			const { direction, value } = action.payload;
			state[direction].twinIndex = value;
		},
		setTwinArray(state, action) {
			const { direction, value } = action.payload;
			state[direction].twinArray = value;
		},

		setSwitcherArrows(state, action) {
			const { direction, value } = action.payload;
			state[direction].switcherArrows = value;
		},

		setDisplayedIcons(state, action) {
			const { direction, value } = action.payload;
			state[direction].displayedIcons = value;
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
} = graphSwitcherSlice.actions;
export const graphSwitcherReducer = graphSwitcherSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const graphSwitcherSlice = createSlice({
// 	name: "graphSwitch",
// 	initialState: {
// 		switcher: false,
// 		twinsNotDisplayed: [],
// 		twinIndex: 0,
// 		twinArray: [],
// 		switcherArrows: { left: false, right: false },
// 		displayedIcons: [{id:null, panelArray:[]}],
// 	},
// 	reducers: {
// 		setDisplayedIcons(state, action) {
// 			state.displayedIcons = action.payload;},
// 		setSwitcher(state, action) {
// 			state.switcher = action.payload;
// 		},
// 		setTwinsNotDisplayed(state, action) {
// 			state.twinsNotDisplayed = action.payload;
// 		},
// 		setTwinIndex(state, action) {
// 			state.twinIndex = action.payload;
// 		},
// 		setTwinArray(state, action) {
// 			state.twinArray = action.payload;
// 		},
// 		setSwitcherArrows(state, action) {
// 			state.switcherArrows = action.payload;
// 		},
// 	},
// });

// export const {
// 	setSwitcher,
// 	setTwinsNotDisplayed,
// 	setTwinIndex,
// 	setTwinArray,
// 	setSwitcherArrows,setDisplayedIcons
// } = graphSwitcherSlice.actions;
// export const graphSwitcherReducer = graphSwitcherSlice.reducer;
