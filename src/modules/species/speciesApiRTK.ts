import { baseApi } from "../../shared/baseApi";
import { Species } from "./types/Species";

export const speciesRTKEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSpecies: builder.query<Species[], { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: "/species",
        params: { Page: page, PageSize: pageSize },
      }),
      providesTags: ["Species"],
      transformResponse: (response: { result: { items: Species[] } }) =>
        response.result.items,
    }),
  }),
  overrideExisting: false, // Set to `true` to allow overriding endpoints
});

export const { useFetchSpeciesQuery } = speciesRTKEndpoints;
