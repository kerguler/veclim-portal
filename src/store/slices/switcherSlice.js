import { createSlice } from '@reduxjs/toolkit';

const graphSwitcherSlice = createSlice({
  name: 'graphSwitch',
  initialState: {
    left: {
      switcher: false,
      twinsNotDisplayed: [],
      twinIndex: 0,
      siblingCount: 1,
      twinArray: [],
      switcherArrows: { left: false, right: false },
      displayedIcons: [{ id: null, panelArray: [] }],
    },
    right: {
      switcher: false,
      twinsNotDisplayed: [],
      twinIndex: 0,
      siblingCount: 1,
      twinArray: [],
      switcherArrows: { left: false, right: false },
      displayedIcons: [{ id: null, panelArray: [] }],
    },
  },
  reducers: {
    setSiblingCount(state, action) {
      const { direction, value } = action.payload;
      state[direction].siblingCount = value;
    },
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
  setSiblingCount,
} = graphSwitcherSlice.actions;
export const graphSwitcherReducer = graphSwitcherSlice.reducer;
