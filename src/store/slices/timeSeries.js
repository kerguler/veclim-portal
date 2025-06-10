import { createSlice } from '@reduxjs/toolkit';
import { useFetchTimeSeriesDataQuery } from '../apis/timeSeriesApi';
import { getCurrentDate } from '../apis/utils';
const series = createSlice({
	name: 'series',
	initialState: {
		location: { lon: 0, lat: 0 },
		date: {
			day0: 0,
			day1: 0,
			inv: 0,
			date0: getCurrentDate('-'),
			date1: getCurrentDate('-'),
		},
		'meteo-ts': {
			'2010-2019': {
				photo: [],
				atemp: [],
				rehum: [],
				precp: [],
				soilw: [],
			},
		},
		presence: {
			albopictus: [
				{
					dataset: '',
					citation: '',
					locations: [],
				},
			],
		},
	},
});
