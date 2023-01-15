import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { loggedIn: false },
  reducers: {
    login(state) {
      // login process
      // request to api, etc

      // *temporary*
      state.loggedIn = true
    },
    logout(state) {
      state.loggedIn = false
    },
  },
})

export const userActions = userSlice.actions

export default userSlice
