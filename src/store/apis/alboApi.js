import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDateRange } from "./utils";

const alboApi = createApi({
	reducerPath: "alboInfo",
	baseQuery: fetchBaseQuery({
		// baseUrl: "http://localhost:8000/devapi/sim-runner/run-albochik",
		// baseUrl: "http://localhost:9000/",

		// baseUrl: `${process.env.REACT_APP_DEV_URL}/sim-runner/run-albochik`,
		baseUrl: "https://veclim.com/devapi/sim-runner/",
		prepareHeaders: (headers) => {
			headers.set("Content-Type", "application/json");
			return headers;
		},
	}),
	tagTypes: ["AlboData"],
	endpoints(builder) {
		return {
			fetchSimStatus: builder.query({
				query: (param) => {
					return {
						url: `sim_status/${param}`,
						Method: "GET",
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
						url: "start_sim",
						body: simulationData,
						method: "POST",
					};
				},
				providesTags: ["AlboData"],
			}),
		};
	},
});

export const { useSubmitAlboDataMutation, useFetchSimStatusQuery } = alboApi;
export { alboApi };
