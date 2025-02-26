import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false, token: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // Store user object
      state.token = action.payload.token; // Store JWT token
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
