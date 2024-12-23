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

			// console.log("Raw Response Text:", rawText);

			// Replace all instances of NaN with null in the raw text
			const sanitizedText = rawText.replace(/NaN/g, "null");

			//  console.log("Sanitized Response Text:", sanitizedText);

			try {
				// Parse sanitized text into JSON

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
					location = JSON.parse(data.position);

					// const dateRange = `${"2024-01-01:2025-12-31"}`;
					const dateRange = getDateRange(":");
					const vectorName = data.vectorName;
					let param;
					if (vectorName === "albopictus") {
						param = {
							vec: "albopictus",
							lon: location.lng,
							lat: location.lat,
							dates: dateRange,
							opr: "ts",
						};
					} else {
						param = {
							vec: "papatasi",
							lon: location.lng,
							lat: location.lat,
							dates: `${"2015-03-31:2015-12-31"}`,
							opr: "ts",
						};
					}

					return {
						url: "",
						params: param,
						method: "GET",
					};
				},

				// invalidatesTags: ["AlboData"],
			}),
		};
	},
});

export const { useFetchTimeSeriesDataQuery, useFetchTSDateRangeQuery } =
	timeSeriesApi;
export { timeSeriesApi };
