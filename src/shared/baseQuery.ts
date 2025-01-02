import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../core/store";
import { Mutex } from "async-mutex";
import { Envelope } from "./types/Envelope";
import { LoginResponse } from "../modules/auth/types/LoginResponse";
import { authActions } from "../modules/auth/authSlice";

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

const mutex = new Mutex();

export const baseQueryWithRefresh = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const authResponse = await baseQuery(
          { url: "/Accounts/refresh", method: "POST" },
          api,
          extraOptions
        );

        if (authResponse.data) {
          const data = authResponse.data as Envelope<LoginResponse>;
          api.dispatch(
            authActions.tokenReceived({
              accessToken: data.result!.accessToken,
            })
          );
        }

        result = await baseQuery(args, api, extraOptions);
      } finally {
        release();
      }
    }
  }
  return result;
};
