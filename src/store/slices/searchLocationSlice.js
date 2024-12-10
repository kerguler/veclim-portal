import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../apis/utils";

const searchLocationSlice = createSlice({
	name: "form",
	initialState: {
		locationName: "",
		showInstructions: false,
		locationRequested: true,
		date: getCurrentDate("-"),
		capitalArray: [],
		superUser: false,
		pageTransition: null,
		dividerPosition: null,
	},
	reducers: {
		setDividerPosition(state, action) {
			state.dividerPosition = action.payload;
		},
		setPageTransition(state, action) {
			state.pageTransition = action.payload;
		},

		setClickLocation(state, action) {
			state.clickLocation = action.payload;
		},

		setSuperUser(state, action) {
			state.superUser = action.payload;
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
				CapitalName: "Use current location",
				ContinentName: "NULL",
				CountryCode: "NULL",
				CountryName: "NULL",
			};
			action.payload.unshift(currentLocation);
			state.capitalArray = action.payload;
		},
		setLocationRequested(state, action) {
			state.locationRequested = action.payload;
		},

		setUserPosition(state, action) {
			state.userPosition = action.payload;
		},
	},
});

export const {
	setLocationRequested,
	setShowInstructions,
	changeDate,
	changeSearchTermLocation,
	populateArray,
	setUserPosition,
	setSuperUser,
	setPageTransition,
	setDividerPosition,
} = searchLocationSlice.actions;
export const searchLocationReducer = searchLocationSlice.reducer;
