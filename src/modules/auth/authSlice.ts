import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

interface AuthState {
  accessToken: string | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: undefined,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (
    data: { userEmail: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/Accounts/login", data, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data.result;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout Thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/auth/logout");
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectAccessToken: (state) => state.accessToken,
    selectIsAuthenticated: (state) => state.isAuthenticated,
  },
  reducers: {
    tokenReceived: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string;
      }>
    ) => {
      state.accessToken = payload.accessToken;
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.accessToken = undefined;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const authActions = authSlice.actions;

export const authSelectors = authSlice.selectors;

export default authSlice.reducer;
