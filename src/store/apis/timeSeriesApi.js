import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDateRange } from './utils';
import { getVector } from 'vectors/registry';

const timeSeriesApi = createApi({
  reducerPath: 'timeSeriesInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    fetchFn: async (input, init) => {
      const response = await fetch(input, init);
      const rawText = await response.text(); // Read raw text response
      const sanitizedText = rawText.replace(/NaN/g, 'null');

      try {
        // Let fetchBaseQuery call .json() on this Response
        return new Response(sanitizedText, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      } catch (error) {
        console.error('Error parsing sanitized JSON:', error);
        return {
          error: {
            status: response.status,
            statusText: response.statusText,
            message: 'Failed to parse sanitized response JSON.',
          },
        };
      }
    },
  }),

  tagTypes: ['TimeSeries'],
  endpoints(builder) {
    return {
      fetchTimeSeriesData: builder.query({
        query: (data) => {
          // ---- Position: support both object and JSON string ----
          let location = data.position;

          if (typeof location === 'string') {
            try {
              location = JSON.parse(location);
            } catch (e) {
              console.warn('Could not parse position JSON:', data.position);
            }
          }

          const lat = location?.lat;
          const lng = location?.lng;

          // ---- Vector / registry config ----
          const vectorName = data.vectorName;
          const vec = getVector(vectorName);
          const tsCfg = vec?.timeseries || {};

          // vec param to send to backend
          const vecParam = tsCfg.vecParam || vec?.id || vectorName;

          // dates param
          let dates = getDateRange(':');
          if (tsCfg.dateMode === 'fixed' && tsCfg.fixedRange) {
            dates = tsCfg.fixedRange;
          }

          const opr = tsCfg.opr || 'ts';

          const params = {
            vec: vecParam,
            dates,
            lon: lng,
            lat: lat,
            opr,
          };

          return {
            url: '',
            params,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchTimeSeriesDataQuery } = timeSeriesApi;
export { timeSeriesApi };
