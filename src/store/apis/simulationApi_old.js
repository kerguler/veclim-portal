import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const simulationApi = createApi({
	reducerPath: "simulationApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_DEV_URL,
		prepareHeaders: (headers, { getState }) => {
			const csrf = localStorage.getItem("csrfToken");
			headers.set("Content-Type", "application/json");
			headers.set("Origin", process.env.REACT_APP_SIM_URL);
			if (csrf) {
				headers.set("X-CSRFToken", csrf);
				headers.set("Access-Control-Allow-Origin", "*");
			}
			return headers;
		},
		credentials: "include",
	}),
	tagTypes: ["Simulation List"],
	endpoints(builder) {
		return {
			runSimulation: builder.mutation({
				query: (data) => {
					return {
						url: "parser/run_models",
						method: "POST",
						body: { data: data },
					};
				},
			}),
			getSimulationList: builder.query({
				query: (data) => {
					return {
						url: `api/simulations/`,
						method: "GET",
					};
				},
				providesTags: ["Simulation List"],
			}),
			createSimulation: builder.mutation({
				query: (data) => {
					return {
						url: `api/simulations/`,
						method: "POST",
						body:  data,
					};
				},
				invalidatesTags: ["Simulation List"],
			}),
			deleteSimulation: builder.mutation({
				query: (data) => {
					return {
						url: `api/simulation/${data.id}/`,
						method: "DELETE",
					};
				},
				invalidatesTags: ["Simulation List"],
			}),
			editSimulation: builder.mutation({
				query: (data) => {
					return {
						url: `api/simulation/${data.id}/`,
						method: "PUT",
						body: data,
					};
				},
				invalidatesTags: ["Simulation List"],
			}),
		};
	},
});

export const {
	useGetSimulationListQuery,
	useCreateSimulationMutation,
	useDeleteSimulationMutation,
	useEditSimulationMutation,
	useRunSimulationMutation,
} = simulationApi;
export { simulationApi };
