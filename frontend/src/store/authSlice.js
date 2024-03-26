import { createSlice } from "@reduxjs/toolkit";

const storedStatus = localStorage.getItem("authStatus");
const initialState = {
  status: storedStatus ? JSON.parse(storedStatus) : false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload.userData);
      localStorage.setItem("authStatus", JSON.stringify(true));
      console.log(action.payload.userData);
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
      // Clear authentication status from browser storage
      localStorage.removeItem("authStatus");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
