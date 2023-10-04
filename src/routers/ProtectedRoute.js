import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // let location = useLocation();
  // const { signInDetails } = useSelector((state) => state.signInAuthReducer);
  // const { data } = signInDetails;

  // if (!data) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // } else if (!allowedRoles.includes(data.data.type)) {
  //   return <Navigate to="/forbidden" />;
  // }

  return children;
};

export default ProtectedRoute;
