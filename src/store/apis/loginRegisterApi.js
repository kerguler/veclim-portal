import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
function getCookie(name) {
	return (
		document.cookie
			.split("; ")
			.find((row) => row.startsWith(name + "="))
			?.split("=")[1] || ""
	);
}
const loginRegisterApi = createApi({
	reducerPath: "loginRegisterApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_DEV_URL,
		prepareHeaders: (headers) => {
			const csrf = localStorage.getItem("csrfToken");
			const csrf1 = getCookie("csrftoken");
			headers.set("Content-Type", "application/json");
			console.log("CSRF token upon LOGIN:", csrf1);
			if (csrf1) {
				headers.set("X-CSRFToken", csrf1);
			}
			return headers;
		},
		credentials: "include", // important for sending cookies
	}),
	tagTypes: ["LoginRegister", "Csrf"],
	endpoints(builder) {
		return {
			// Fetch and store CSRF token in localStorage
			fetchCsrf: builder.query({
				query: () => ({
					url: "csrf/",
					method: "GET",
				}),
				providesTags: ["Csrf"],
				async onQueryStarted(arg, { queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						console.log("CSRF token fetched:", data.csrftoken);
						if (data.csrftoken) {
							localStorage.setItem("csrfToken", data.csrftoken);
							console.log("CSRF token stored in localStorage.");
						}
					} catch (error) {
						console.error("Failed to fetch CSRF token", error);
					}
				},
			}),

			login: builder.mutation({
				query: (data) => ({
					url: "sauth/",
					method: "POST",
					body: data,
				}),
				invalidatesTags: ["Csrf"],
			}),

			register: builder.mutation({
				query: (data) => ({
					url: "api/register/",
					method: "POST",
					body: data,
				}),
				invalidatesTags: ["Csrf"],
			}),

			logout: builder.mutation({
				query: () => ({
					url: "logout/",
					method: "POST",
				}),
				invalidatesTags: ["Csrf"],
			}),

			loginWithToken: builder.mutation({
				query: (data) => ({
					url: "authtoken/",
					method: "POST",
					body: data,
				}),
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
