import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: undefined, loggedIn: false },
  reducers: {
    login(state, action) {
      // login process
      // request to api, etc

      state.loggedIn = true;
      state.data = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.data = undefined;
      localStorage.removeItem("jwt");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
