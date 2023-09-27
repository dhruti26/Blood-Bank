import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    //redirect to home page to check user is already loggedin with the help of token
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default PublicRoute;