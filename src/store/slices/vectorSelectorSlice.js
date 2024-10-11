import { createSlice } from "@reduxjs/toolkit";
const vectorSelectorSlice = createSlice({
	name: "vector",
	initialState: {
		vectorName: "albopictus",
		vectorNames: ["albopictus", "papatasi"],
		mapVector: "albopictus",
	},
	reducers: {
		setMapVector(state, action) {
			state.mapVector = action.payload;
		},
		setVectorName(state, action) {
			state.vectorName = action.payload;
		},
	},
});
export const { setVectorName, setMapVector } = vectorSelectorSlice.actions;
export const vectorSelectorReducer = vectorSelectorSlice.reducer;
