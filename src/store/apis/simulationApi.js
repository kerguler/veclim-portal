import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const simulationApi = createApi({
	reducerPath: "simulationApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_LOCAL_DEV_URL,
		prepareHeaders: (headers, { getState }) => {
			const csrf = localStorage.getItem("csrfToken");
			headers.set("Content-Type", "application/json");
			// headers.set("Origin", process.env.REACT_APP_SIM_URL);
			if (csrf) {
				headers.set("X-CSRFToken", csrf);
				// 	// headers.set("Access-Control-Allow-Origin", "*");
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
					const params = new URLSearchParams();

					// Handle optional include_results param
					if (data?.return_results) {
						params.append("include_results", "true");
					} else if (data?.return_results === false) {
						params.append("include_results", "false");
					}

					// If fetching a single simulation by ID
					if (data?.id) {
						return {
							url: `simulations/${data.id}/?${params.toString()}`,
							method: "GET",
						};
					}

					// If fetching the list
					return {
						url: `simulations/?${params.toString()}`,
						method: "GET",
					};
				},
				providesTags: ["Simulation List"],
			}),
			createSimulation: builder.mutation({
				query: (data) => {
					return {
						url: `simulations/`,
						method: "POST",
						body: data,
					};
				},
				invalidatesTags: ["Simulation List"],
			}),
			deleteSimulation: builder.mutation({
				query: (data) => {
					return {
						url: `simulations/${data.id}/`,
						method: "DELETE",
					};
				},
				invalidatesTags: ["Simulation List"],
			}),
			editSimulation: builder.mutation({
				query: (data) => {
					return {
						url: `simulations/${data.id}/`,
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
