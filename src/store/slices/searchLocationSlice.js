import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../apis/utils";

const searchLocationSlice = createSlice({
	name: "form",
	initialState: {
		locationName: "",
		// userPosition: { lat: null, lng: null },
		 globalPosition: { lat: null, lng: null },
		showInstructions: false,
		locationRequested: true,
		// mapPagePosition: { lat: 35.1966527, lng: 33.3217152 },
		date: getCurrentDate("-"),
		capitalArray: [],
		tileArray: ["colegg"], // ["papatasi_aprdec"],
		superUser: false,
		// currentMapZoom: 1,
		// currentMapCenter: [0, 0],
		// currentMapBounds: null,
		// switchMap: null,
		pageTransition: null,
		// mapLoaded: false,
		// leftMapLoaded: false,
		// rightMapLoaded: false,
		dividerPosition: null,
		// directMap: { lon: null, lat: null, display: false },
		// directInit: false,
		// directInitError: { isError: false, message: "", type: "" },
	},
	reducers: {
		setDirectInitError(state, action) {
			state.directInitError = action.payload;
		},
		setDirectInit(state, action) {
			state.directInit = action.payload;
		},
		setDirectMap(state, action) {
			state.directMap = action.payload;
		},
		setDividerPosition(state, action) {
			state.dividerPosition = action.payload;
		},
		setPageTransition(state, action) {
			state.pageTransition = action.payload;
		},
		setCurrentMapBounds(state, action) {
			state.currentMapBounds = action.payload;
		},
		setMapLoaded(state, action) {
			state.mapLoaded = action.payload;
		},
		setLeftMapLoaded(state, action) {
			state.leftMapLoaded = action.payload;
		},
		setRightMapLoaded(state, action) {
			state.rightMapLoaded = action.payload;
		},
		setSwitchMap(state, action) {
			state.switchMap = action.payload;
		},
		setClickLocation(state, action) {
			state.clickLocation = action.payload;
		},

		setCurrentMapZoom(state, action) {
			state.currentMapZoom = action.payload;
		},
		setCurrentMapCenter(state, action) {
			state.currentMapCenter = action.payload;
		},
		setSuperUser(state, action) {
			state.superUser = action.payload;
		},
		setTileArray(state, action) {
			state.tileArray = action.payload;
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
		setGlobalPosition(state, action) {
			if (action && action.payload) {
				state.globalPosition = action.payload;
			} else {
				state.globalPosition = state.userPosition;
			}
		},
		setUserPosition(state, action) {
			state.userPosition = action.payload;
		},
		setMapPagePosition(state, action) {
			state.mapPagePosition = action.payload;
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
	setUserPosition,
	setMapPagePosition,
	setTileArray,
	setSuperUser,
	setCurrentMapZoom,
	setCurrentMapCenter,
	setSwitchMap,
	setMapLoaded,
	setLeftMapLoaded,
	setRightMapLoaded,
	setCurrentMapBounds,
	setPageTransition,
	setDividerPosition,
	setDirectMap,
	setDirectInit,
	setDirectInitError,
} = searchLocationSlice.actions;
export const searchLocationReducer = searchLocationSlice.reducer;
