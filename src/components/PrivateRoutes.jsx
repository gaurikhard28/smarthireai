// components/PrivateRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userType"); // You must save this during login

  if (!token) return <Navigate to="/login" />;
  console.log("Role from localStorage:", role); // Debugging line
    console.log("Allowed roles:", allowedRoles); // Debugging line
  if (!allowedRoles.includes(role)) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
