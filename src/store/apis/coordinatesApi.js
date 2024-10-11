import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCurrentDate } from "./utils";

const coordinatesApi = createApi({
	reducerPath: "coordinateInfo",
	baseQuery: fetchBaseQuery({
		 baseUrl: process.env.REACT_APP_BASE_URL,
	}),
	endpoints(builder) {
		return {
			fetchCoordinateData: builder.query({
				providesTags: ["Coordinate"],

				query: (jsonString) => {
					let location;

					location = JSON.parse(jsonString);

					return {
						url: "",
						params: {
							lon: location.lng,
							lat: location.lat,
							date: getCurrentDate("-"),
						},
						method: "GET",
					};
				},
			}),
		};
	},
});

export const { useFetchCoordinateDataQuery } = coordinatesApi;
export { coordinatesApi };
