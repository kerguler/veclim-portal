import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDateRange } from "./utils";
import { io } from "socket.io-client";
// const SOCKET_URL = "ws://localhost:8000/devapi/sim-runner/socket.io/";
const SOCKET_URL = "ws://localhost:8000/sim";
let socket; // Singleton instance of WebSocket
const alboApi = createApi({
	reducerPath: "alboInfo",
	baseQuery: fetchBaseQuery({
		// baseUrl: "https://veclim.com/devapi/sim-runner/",
		baseUrl: "http://localhost:8000/devapi/sim-runner/",
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
			// WebSocket - Listen for Real-Time Updates
			// listenToSimUpdates: builder.query({
			// 	queryFn: () => ({ data: [] }), // No REST calls, just WebSockets
			// 	async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
			// 		if (!socket) {
			// 			socket = io("ws://localhost:8000/", {
			// 				path: "/devapi/sim-runner/socket.io/sim/",
			// 				transports: ["websocket", "polling"], // Force WebSocket, disable polling
			// 				reconnectionAttempts: 5, // Limit reconnection attempts
			// 				reconnectionDelay: 2000, // Delay between reconnections
			// 			});
			// 		}
			// 		console.log("WebSocket Connected!");

			// 		const handleTaskUpdate = (message) => {
			// 			console.log("hellp");
			// 			console.log("Received WebSocket Update:", message);
			// 			updateCachedData((draft) => {
			// 				draft.push(message);
			// 				draft.push("Hello");
			// 			});
			// 		};

			// 		socket.on("task_update", handleTaskUpdate);
			// 		try {
			// 			await cacheEntryRemoved;
			// 		} finally {
			// 			if (socket) {
			// 				socket.off("task_update", handleTaskUpdate); // Cleanup only this event, not disconnecting the socket
			// 				socket.disconnect(); // ✅ Close WebSocket when the component unmounts
			// 				socket = null;
			// 				console.log("WebSocket Disconnected");
			// 			}
			// 		}
			// 	},
			// }),
		};
	},
});

export const {
	useSubmitAlboDataMutation,
	useFetchSimStatusQuery,
	useListenToSimUpdatesQuery,
} = alboApi;
export { alboApi };
