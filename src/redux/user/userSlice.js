import { createSlice } from "@reduxjs/toolkit";
import { getUserData, setUserData } from "../../utils/authStorage";

const initialState = {
  value: 0,
  token: getUserData().token,
  userData: getUserData().userData,
  role: getUserData().role
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUserDetails: (state, action) => {

      setUserData({
        userData: action.payload.userData,
        token: action.payload.token,
        roleName : action.payload.roleName
      });

      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.role = action.payload.roleName;
    },

    clearUserDetails: (state) => {
      state.userData = null;
      state.token = null;
    },

  },
});

export const {setUserDetails, clearUserDetails} = userSlice.actions;
export default userSlice.reducer;
