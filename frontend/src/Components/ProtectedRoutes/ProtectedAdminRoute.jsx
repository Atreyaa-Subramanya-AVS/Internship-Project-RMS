import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const userType = window.localStorage.getItem("userType");

  console.log(
    "ProtectedAdminRoute - isLoggedIn:",
    isLoggedIn,
    "userType:",
    userType
  );

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (userType !== "Admin") {
    return <Navigate to="/user" />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
