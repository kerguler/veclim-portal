import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const loginRegisterApi = createApi({
	reducerPath: "loginRegisterApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_LOCAL_DEV_URL,
		prepareHeaders: (headers, { getState }) => {
			headers.set("Content-Type", "application/json");
			return headers;
		},
		credentials: "include",
	}),
	tagTypes: ["LoginRegister"],
	endpoints(builder) {
		return {
			logout: builder.mutation({
				query: () => ({
					url: "logout/",
					method: "POST",
				}),
				invalidatesTags: ["Csrf"],
			}),
			FetchCsrf: builder.query({
				query: () => {
					return {
						url: "csrf/",
						method: "GET",
					};
				},
				providesTags: ["Csrf"],
			}),
			login: builder.mutation({
				query: (data) => {
					return {
						url: "sauth/",
						method: "POST",
						body: data,
					};
				},
			}),
			register: builder.mutation({
				query: (data) => {
					return {
						url: "api/register/",
						method: "POST",
						body: data,
					};
				},
				invalidatesTags: ["Csrf"],
			}),

			loginWithToken: builder.mutation({
				query: (data) => {
					return {
						url: "authtoken/",
						method: "POST",
						body: data,
					};
				},
			}),
		};
	},
});
export const {
	useLoginMutation,
	useRegisterMutation,
	useLoginWithTokenMutation,
	useFetchCsrfQuery,
	useLogoutMutation,
} = loginRegisterApi;

export { loginRegisterApi };
