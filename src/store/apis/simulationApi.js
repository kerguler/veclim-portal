import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from './utils';
const simulationApi = createApi({
  reducerPath: 'simulationApi',
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
      }
      return headers;
    },
  }),
  tagTypes: ['Simulation List'],
  endpoints(builder) {
    return {
      runSimulation: builder.mutation({
        query: (data) => {
          return {
            url: 'parser/run_models',
            method: 'POST',
            body: { data: data },
          };
        },
      }),
      getSimulationList: builder.query({
        query: (data) => {
          const params = new URLSearchParams();

          // Handle optional include_results param
          if (data?.return_results) {
            params.append('include_results', 'true');
          } else if (data?.return_results === false) {
            params.append('include_results', 'false');
          }

          // If fetching a single simulation by ID
          if (data?.id) {
            return {
              url: `simulations/${data.id}/?${params.toString()}`,
              method: 'GET',
            };
          }

          // If fetching the list
          return {
            url: `simulations/?${params.toString()}`,
            method: 'GET',
          };
        },
        providesTags: ['Simulation List'],
      }),
      createSimulation: builder.mutation({
        query: (data) => {
          return {
            url: `simulations/`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['Simulation List'],
      }),
      deleteSimulation: builder.mutation({
        query: (data) => {
          return {
            url: `simulations/${data.id}/`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['Simulation List'],
      }),
      editSimulation: builder.mutation({
        query: (data) => {
          return {
            url: `simulations/${data.id}/`,
            method: 'PUT',
            body: data,
          };
        },
        invalidatesTags: ['Simulation List'],
      }),
    };
  },
});

export const {
  useGetSimulationListQuery,
  useCreateSimulationMutation,
  useDeleteSimulationMutation,
  useEditSimulationMutation,
  useRunSimulationMutation,
  useLazyGetSimulationListQuery,
} = simulationApi;
export { simulationApi };

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// function getCookie(name) {
//   return (
//     document.cookie
//       .split('; ')
//       .find((row) => row.startsWith(name + '='))
//       ?.split('=')[1] || ''
//   );
// }
// const simulationApi = createApi({
//   reducerPath: 'simulationApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_DEV_URL,
//     prepareHeaders: (headers, { getState }) => {
//       // const csrf = localStorage.getItem('csrfToken');
//       // const csrf1 = getCookie('csrftoken');
//       const csrf = getCookie('csrftoken');
//       headers.set('Content-Type', 'application/json');
//       // headers.set("Origin", process.env.REACT_APP_SIM_URL);
//       if (csrf) {
//         headers.set('X-CSRFToken', csrf);
//         // 	// headers.set("Access-Control-Allow-Origin", "*");
//       }
//       return headers;
//     },
//     credentials: 'include',
//   }),
//   tagTypes: ['Simulation List'],
//   endpoints(builder) {
//     return {
//       runSimulation: builder.mutation({
//         query: (data) => {
//           return {
//             url: 'parser/run_models',
//             method: 'POST',
//             body: { data: data },
//           };
//         },
//       }),
//       getSimulationList: builder.query({
//         query: (data) => {
//           const params = new URLSearchParams();
//           // Handle optional include_results param
//           if (data?.return_results) {
//             params.append('include_results', 'true');
//           } else if (data?.return_results === false) {
//             params.append('include_results', 'false');
//           }

//           // If fetching a single simulation by ID
//           if (data?.id) {
//             return {
//               url: `simulations/${data.id}/?${params.toString()}`,
//               method: 'GET',
//             };
//           }

//           // If fetching the list
//           return {
//             url: `simulations/?${params.toString()}`,
//             method: 'GET',
//           };
//         },
//         providesTags: ['Simulation List'],
//       }),
//       createSimulation: builder.mutation({
//         query: (data) => {
//           return {
//             url: `simulations/`,
//             method: 'POST',
//             body: data,
//           };
//         },
//         invalidatesTags: ['Simulation List'],
//       }),
//       deleteSimulation: builder.mutation({
//         query: (data) => {
//           return {
//             url: `simulations/${data.id}/`,
//             method: 'DELETE',
//           };
//         },
//         invalidatesTags: ['Simulation List'],
//       }),
//       editSimulation: builder.mutation({
//         query: (data) => {
//           return {
//             url: `simulations/${data.id}/`,
//             method: 'PUT',
//             body: data,
//           };
//         },
//         invalidatesTags: ['Simulation List'],
//       }),
//     };
//   },
// });

// export const {
//   useGetSimulationListQuery,
//   useCreateSimulationMutation,
//   useDeleteSimulationMutation,
//   useEditSimulationMutation,
//   useRunSimulationMutation,
//   useLazyGetSimulationListQuery,
// } = simulationApi;
// export { simulationApi };
