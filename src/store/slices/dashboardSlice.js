import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDate } from 'store/apis/utils';

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState: {
		timeSeriesDates: { date0: '2022-07-01', date1: getCurrentDate('-') },
		user: { userName: '' },
		blinkers: {
			disableDate0: false,
			disableDate1: false,
			displayMap: false,
			displayProceed: true,
			displayParserOutput: false,
			displayAddSimulation: false,
			displayAddVEClimModel: false,
			displayTimeSeries: false,
			displaySimList: false,
			displayVEClimModelList: false,
			displayUserName: true,
			displayEditPage: false,
		},
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},

		setBlinkers(state, action) {
			state.blinkers = action.payload;
		},

		setTimeSeriesDates(state, action) {
			state.timeSeriesDates = action.payload;
		},
	},
});

export const { setTimeSeriesDates, setBlinkers, setUser } =
	dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
