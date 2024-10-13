import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCurrentDate } from "./utils";

const newsApi = createApi({
	reducerPath: "newsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_DEV_URL}/news`,
	}),
	endpoints(builder) {
		return {
			fetchNewsData: builder.query({
				// providesTags: ["News"],

				query: () => {
					return {
						url: "",
						method: "GET",
					};
				},
			}),
		};
	},
});

export const { useFetchNewsDataQuery } = newsApi;
export { newsApi };
