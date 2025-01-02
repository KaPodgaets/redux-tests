import { createApi } from "@reduxjs/toolkit/query";
import { baseQueryWithRefresh } from "./baseQuery";

export const baseApi = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
  tagTypes: ["Auth", "Species"],
});
