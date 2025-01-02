import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefresh } from "../../shared/baseQuery";
import { Species } from "./types/Species";

export const speciesApi = createApi({
  reducerPath: "speciesApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getSpecies: builder.query<Species[], void>({
      query: () => ({
        url: "/Species?Page=1&PageSize=10",
      }),
      transformResponse: (response: { result: { items: Species[] } }) =>
        response.result.items,
    }),
    addSpecies: builder.mutation<Species, Partial<Species>>({
      query: (newSpecies) => ({
        url: "/Species?Page=1&PageSize=10",
        method: "POST",
        body: newSpecies,
      }),
    }),
    updateSpecies: builder.mutation<Species, Species>({
      query: (updatedSpecies) => ({
        url: `species/${updatedSpecies.id}`,
        method: "PUT",
        body: updatedSpecies,
      }),
    }),
  }),
});

export const {
  useGetSpeciesQuery,
  useAddSpeciesMutation,
  useUpdateSpeciesMutation,
} = speciesApi;
