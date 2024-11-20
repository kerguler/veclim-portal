import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDateRange } from "./utils";
const alboApi = createApi({
	reducerPath: "alboInfo",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9000",
	}),
	tagTypes: ["albo"],
	endpoints(builder) {
		return {
			fetchTimeSeriesData: builder.query({
				// providesTags: ["TimeSeries"],

				query: (data) => {
					let location;
					location = JSON.parse(data.position);
                    const dataSent= { }
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
			}),
		};
	},
});

export const { useFetchTimeSeriesDataQuery, useFetchTSDateRangeQuery } =
	timeSeriesApi;
export { timeSeriesApi };
