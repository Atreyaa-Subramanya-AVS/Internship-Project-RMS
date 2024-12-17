import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedUserRoute = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const userType = window.localStorage.getItem("userType");

  console.log(
    "ProtectedUserRoute - isLoggedIn:",
    isLoggedIn,
    "userType:",
    userType
  );

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (userType !== "User") {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default ProtectedUserRoute;
