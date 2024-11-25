import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDateRange } from "./utils";
const alboApi = createApi({
	reducerPath: "alboInfo",
	baseQuery: fetchBaseQuery({
		//  baseUrl: "http://localhost:8000/devapi/sim-runner/default-model-simulate",
		baseUrl: "http://localhost:9000/run-albochik",
		prepareHeaders: (headers) => {
			headers.set("Content-Type", "application/json");
			return headers;
		},
	}),
	tagTypes: ["albo"],
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
			}),
		};
	},
});

export const { useSubmitAlboDataMutation } = alboApi;
export { alboApi };
