import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: undefined, loggedIn: false },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.data = action.payload.user;
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 14 * 24); // 14 * 24 = 14 days

      localStorage.setItem("jwt", action.payload.token);
      localStorage.setItem("expiration", expiration.toISOString());
    },
    logout(state) {
      state.loggedIn = false;
      state.data = undefined;

      localStorage.removeItem("jwt");
      localStorage.removeItem("expiration");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
