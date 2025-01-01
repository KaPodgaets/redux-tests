import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../core/store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5098/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as AppState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
