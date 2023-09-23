import { createSlice } from "@reduxjs/toolkit";
import {userLogin, userRegister} from "./authActions";

//authSlice is our reducer function
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  user: null,
  token, //here key is also token and value is token(the object created above)
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState, //calling object declare before
  reducers: {},
  //extraReducers is used to handle action(authAction)
  extraReducers: (builder) => {
    // login user
    //userLogin is our action
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //if success-it will return the data,that data is known as payload
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      //user,token is returned by authController is access here in redux
      state.user = payload.user;
      state.token = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // REGISTER user
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });


    // CURRENT user
    // builder.addCase(getCurrentUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.user = payload.user;
    // });
    // builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // });
  },
});

export default authSlice;