import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

const stored = authService.getStoredSession();

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      return await authService.login({ email, password, remember });
    } catch (e) {
      return rejectWithValue(e.message || "Login failed");
    }
  }
);

export const logoutAdmin = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored?.user ?? null,
    token: stored?.token ?? null,
    expiresAt: stored?.expiresAt ?? null,
    loading: false,
    error: null,
  },
  reducers: {
    // Called by useAuthGuard when the token expires
    sessionExpired(state) {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
      state.error = "Your session has expired. Please log in again.";
      authService.clearSession();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginAdmin.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(loginAdmin.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload.user;
        s.token = payload.token;
        s.expiresAt =
          JSON.parse(atob(payload.token.split(".")[1])).exp ?? null;
        authService.persistSession(payload);
      })
      .addCase(loginAdmin.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload;
      })
      .addCase(logoutAdmin.fulfilled, (s) => {
        s.user = null;
        s.token = null;
        s.expiresAt = null;
        s.error = null;
        authService.clearSession();
      });
  },
});

export const { sessionExpired, clearAuthError } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (s) => Boolean(s.auth.token);
export const selectAuthUser = (s) => s.auth.user;
export const selectAuthRole = (s) => s.auth.user?.role ?? null;

export default authSlice.reducer;