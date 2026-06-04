import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDate } from '../apis/utils';

const searchLocationSlice = createSlice({
  name: 'form',
  initialState: {
    locationName: '',
    globalPosition: { lat: null, lng: null },
    showInstructions: false,
    locationRequested: true,
    date: getCurrentDate('-'),
    capitalArray: [],
    tileArray: ['colegg'], // ["papatasi_aprdec"],

    pageTransition: null,
    dividerPosition: null,
  },
  reducers: {
    setDirectInitError(state, action) {
      state.directInitError = action.payload;
    },
    setDividerPosition(state, action) {
      state.dividerPosition = action.payload;
    },
    setPageTransition(state, action) {
      state.pageTransition = action.payload;
    },
    changeSearchTermLocation(state, action) {
      state.locationName = action.payload;
    },
    changeDate(state, action) {
      state.date = action.payload;
    },
    setShowInstructions(state, action) {
      state.showInstructions = action.payload;
    },
    populateArray(state, action) {
      var currentLocation = {
        CapitalLatitude: 0,
        CapitalLongitude: 0,
        CapitalName: 'Use current location',
        ContinentName: 'NULL',
        CountryCode: 'NULL',
        CountryName: 'NULL',
      };
      action.payload.unshift(currentLocation);
      state.capitalArray = action.payload;
    },
    setLocationRequested(state, action) {
      state.locationRequested = action.payload;
    },
    setGlobalPosition(state, action) {
      if (action && action.payload) {
        state.globalPosition = action.payload;
      } else {
        state.globalPosition = state.userPosition;
      }
    },
  },
});

export const {
  setLocationRequested,
  setShowInstructions,
  changeDate,
  changeSearchTermLocation,
  populateArray,
  setGlobalPosition,

  setPageTransition,
  setDividerPosition,
} = searchLocationSlice.actions;
export const searchLocationReducer = searchLocationSlice.reducer;
