import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signingIn: true,
  curretnUser: undefined
};

export const userReducer = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateSigningIn: (state, action) => {
      state.signingIn = action.payload;
    }
  }
});

export const { updateSigningIn, updateCurrentuser } = userReducer.actions;

export default userReducer.reducer;
