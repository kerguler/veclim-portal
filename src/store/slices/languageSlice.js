import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    languageCode: "en",
  },
  reducers: {
    changeLanguage(state, action) {
      state.languageCode = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
