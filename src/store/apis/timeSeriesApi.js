import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDateRange } from "./utils";
import { useSelector } from "react-redux";

const timeSeriesApi = createApi({
	reducerPath: "timeSeriesInfo",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BASE_URL,
		fetchFn: async (input, init) => {
			const response = await fetch(input, init);
			const rawText = await response.text(); // Read raw text response
			const sanitizedText = rawText.replace(/NaN/g, "null");
			try {
				return new Response(sanitizedText, {
					status: response.status,
					statusText: response.statusText,
					headers: response.headers,
				});
			} catch (error) {
				console.error("Error parsing sanitized JSON:", error);
				return {
					error: {
						status: response.status,
						statusText: response.statusText,
						message: "Failed to parse sanitized response JSON.",
					},
				};
			}
		},

	}),

	tagTypes: ["TimeSeries"],
	endpoints(builder) {
		return {
			fetchTimeSeriesData: builder.query({
				query: (data) => {
					let location;
					location = data.position;
					console.log("fetchTimeSeriesData", data.position);
					const dateRange = getDateRange(":");
					const vectorName = data.vectorName;
					let param = {
						vec:
							vectorName === "albopictus"
								? "albopictus"
								: "papatasi",
						lon: location.lng,
						lat: location.lat,
						dates:
							vectorName === "albopictus"
								? dateRange
								: "2015-03-31:2015-12-31",
						opr: "ts",
					};


					return {
						url: "",
						params: param,
						method: "GET",
					};
				},

			}),
		};
	},
	
});

export const { useFetchTimeSeriesDataQuery, useFetchTSDateRangeQuery } =
	timeSeriesApi;
export { timeSeriesApi };
