import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const colorBarsApi = createApi({
	reducerPath: 'colorBarsInfo',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BASE_URL,
	}),
	tagTypes: ['ColorBars'],
	endpoints(builder) {
		return {
			fetchColorBarsData: builder.query({
				providesTags: ['ColorBars'],

				query: () => {
					return {
						url: '',
						params: {
							v: 'colegg',
						},
						method: 'GET',
					};
				},
				invalidatesTags: ['ColorBars'],
			}),
		};
	},
});

export const { useFetchColorBarsDataQuery } = colorBarsApi;
export { colorBarsApi };
