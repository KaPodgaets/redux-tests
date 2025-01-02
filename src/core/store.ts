import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import { speciesApi } from "../modules/species/speciesApi";
import { useDispatch, useSelector } from "react-redux";
import { speciesRTKEndpoints } from "../modules/species/speciesApiRTK";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [speciesApi.reducerPath]: speciesApi.reducer,
    [speciesRTKEndpoints.reducerPath]: speciesRTKEndpoints.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(speciesApi.middleware)
      .concat(speciesRTKEndpoints.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
