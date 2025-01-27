import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDateRange } from "./utils";

const alboApi = createApi({
	reducerPath: "alboInfo",
	baseQuery: fetchBaseQuery({
		// baseUrl: "http://localhost:8000/devapi/sim-runner/run-albochik",
		// baseUrl: "http://localhost:9000/run-albochik",
		baseUrl: "https://veclim.com/devapi/sim-runner/run-albochik",
		prepareHeaders: (headers) => {
			headers.set("Content-Type", "application/json");
			return headers;
		},
	}),
	tagTypes: ["AlboData"],
	endpoints(builder) {
		return {
			submitAlboData: builder.mutation({
				// providesTags: ["TimeSeries"],

				query: (param) => {
					const simulationData = {
						param: param,
					};

					return {
						url: "",
						body: simulationData,
						method: "POST",
					};
				},
				providesTags: ["AlboData"],
			}),
		};
	},
});

export const { useSubmitAlboDataMutation } = alboApi;
export { alboApi };
