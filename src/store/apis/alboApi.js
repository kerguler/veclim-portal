import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDateRange } from './utils';
import { io } from 'socket.io-client';
// const SOCKET_URL = "ws://localhost:8000/devapi/sim-runner/socket.io/";
const SOCKET_URL = 'ws://localhost:8000/sim';
let socket; // Singleton instance of WebSocket
const alboApi = createApi({
	reducerPath: 'alboInfo',
	baseQuery: fetchBaseQuery({
		// baseUrl: "https://veclim.com/devapi/sim-runner/",
		baseUrl: 'http://localhost:8000/devapi/sim-runner/',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	tagTypes: ['AlboData'],
	endpoints(builder) {
		return {
			fetchSimStatus: builder.query({
				query: (param) => {
					return {
						url: `sim_status/${param}`,
						Method: 'GET',
					};
				},
			}),
			submitAlboData: builder.mutation({
				// providesTags: ["TimeSeries"],

				query: (param) => {
					const simulationData = {
						param: param,
					};

					return {
						url: 'start_sim',
						body: simulationData,
						method: 'POST',
					};
				},
				providesTags: ['AlboData'],
			}),
		};
	},
});

export const {
	useSubmitAlboDataMutation,
	useFetchSimStatusQuery,
	useListenToSimUpdatesQuery,
} = alboApi;
export { alboApi };
