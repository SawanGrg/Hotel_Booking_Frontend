import { createSlice } from "@reduxjs/toolkit";
import { getUserData, setUserData } from "../../utils/authStorage";

const initialState = {
  value: 0,
  token: getUserData().token,
  userData: getUserData().userData,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUserDetails: (state, action) => {

      setUserData({
        userData: action.payload.userData,
        token: action.payload.token
      });

      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },

    clearUserDetails: (state) => {
      state.userData = null;
      state.token = null;
    },

  },
});

export const {setUserDetails, clearUserDetails} = userSlice.actions;
export default userSlice.reducer;
