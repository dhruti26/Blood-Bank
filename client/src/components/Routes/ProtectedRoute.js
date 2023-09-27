import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  //get user current
  const getUser = async () => {
    try {
      const { data } = await API.get("/auth/current-user");
      if (data?.success) {
        //no need to store current user request - directly dispatch the action
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
        //if error occurs in fetching user,delete token
      localStorage.clear();
      console.log(error);
    }
  };

  //call function at initial time
  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;