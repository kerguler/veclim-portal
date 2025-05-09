import { createSlice } from "@reduxjs/toolkit";
const simulationSlice = createSlice({
	name: "simulation",
	initialState: {
		title: "",
		description: "",
		simList: [],
		editedSimulation: {
			id: null,
			title: "",
			description: "",
			returnMethod: "",
			modelType: "",
			modelData: "",
			popJson: null,
		},
		addedSimulation: {
			id: null,
			title: "",
			description: "",
			returnMethod: "",
			modelType: "",
			modelData: "",
			popJson: null,
		},
		parsedJson: {},
	},
	reducers: {
		setParsedJson(state, action) {
			state.parsedJson = action.payload;
		},
		setAddedSimulation(state, action) {
			state.addedSimulation = action.payload;
		},
		setEditedSimulation(state, action) {
			state.editedSimulation = action.payload;
		},
		setTitle(state, action) {
			state.title = action.payload;
		},
		setDescription(state, action) {
			state.description = action.payload;
		},
		setSimList(state, action) {
			state.simList = action.payload;
		},
		addSimulation(state, action) {
			state.simList.push(action.payload);
		},
		deleteSimulation(state, action) {
			state.simList = state.simList.filter(
				(sim) => sim.id !== action.payload,
			);
		},
		modifySimulation(state, action) {
			const index = state.simList.findIndex(
				(sim) => sim.id === action.payload.id,
			);
			state.simList[index] = action.payload;
		},
	},
});
export const {
	setTitle,
	setDescription,
	setSimList,
	addSimulation,
	deleteSimulation,
	modifySimulation,
	setEditedSimulation,
	setAddedSimulation,
	setParsedJson,
} = simulationSlice.actions;
export const simulationReducer = simulationSlice.reducer;
