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
  tagTypes: ['LoginRegister', 'CurrentUser'],
  endpoints(builder) {
    return {
      logout: builder.mutation({
        query: () => ({
          url: 'logout/',
          method: 'POST',
        }),
        invalidatesTags: ['Csrf', 'CurrentUser'],
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
        invalidatesTags: ['CurrentUser'],
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

      // who's logged in via the session cookie, used to recover isStaff on load
      fetchCurrentUser: builder.query({
        query: () => ({
          url: 'users/me/',
          method: 'GET',
        }),
        providesTags: ['CurrentUser'],
      }),

      // ask for access to one draft vector, once logged in
      requestDraftAccess: builder.mutation({
        query: (vectorId) => ({
          url: 'draft-access/request/',
          method: 'POST',
          body: { vector_id: vectorId },
        }),
        invalidatesTags: ['CurrentUser'],
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
  useLazyFetchCsrfQuery,
  useFetchCurrentUserQuery,
  useRequestDraftAccessMutation,
} = loginRegisterApi;

export { loginRegisterApi };
