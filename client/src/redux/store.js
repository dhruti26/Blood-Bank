import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

//configureStore function contains all objects
const store = configureStore({
    //reducer can be 1 or more add all reducers
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;