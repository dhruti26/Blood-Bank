import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  //rejectWithValue is used to handle error state-inbuilt method
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
        //use interceptor API made in services
      const { data } = await API.post("/auth/login", { role, email, password });
      //store token created in API in localStorage
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        // window.location.replace("/");
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        //to handle custom exception
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
// export const userRegister = createAsyncThunk(
//   "auth/register",
//   async (
//     {
//       name,
//       role,
//       email,
//       password,
//       phone,
//       organisationName,
//       address,
//       hospitalName,
//       website,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await API.post("/auth/register", {
//         name,
//         role,
//         email,
//         password,
//         phone,
//         organisationName,
//         address,
//         hospitalName,
//         website,
//       });
//       if (data?.success) {
//         alert("User Registerd Successfully");
//         window.location.replace("/login");
//         // toast.success("User Registerd Successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// //current user
// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async ({ rejectWithValue }) => {
//     try {
//       const res = await API.get("/auth/current-user");
//       if (res.data) {
//         return res?.data;
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );