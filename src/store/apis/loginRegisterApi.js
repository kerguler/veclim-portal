import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from './utils';
const loginRegisterApi = createApi({
  reducerPath: 'loginRegisterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_DEV_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const state = getState();
      const fromRedux = state.login.csrfToken;
      const fromCookie = getCookie('csrftoken');
      const token = fromRedux || fromCookie;
      if (token) {
        headers.set('X-CSRFToken', token);
        // console.log("CSRF attached:", token);
      }
      return headers;
    },
  }),
  tagTypes: ['LoginRegister'],
  endpoints(builder) {
    return {
      logout: builder.mutation({
        query: () => ({
          url: 'logout/',
          method: 'POST',
        }),
        invalidatesTags: ['Csrf'],
      }),
      FetchCsrf: builder.query({
        query: () => {
          return {
            url: '/csrf/',
            method: 'GET',
          };
        },
        providesTags: ['Csrf'],
      }),
      login: builder.mutation({
        query: (data) => {
          return {
            url: 'sauth/',
            method: 'POST',
            body: data,
          };
        },
      }),
      register: builder.mutation({
        query: (data) => {
          return {
            url: 'register/',
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['Csrf'],
      }),

      loginWithToken: builder.mutation({
        query: (data) => {
          return {
            url: 'authtoken/',
            method: 'POST',
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
  useLogoutMutation,useLazyFetchCsrfQuery
} = loginRegisterApi;

export { loginRegisterApi };
