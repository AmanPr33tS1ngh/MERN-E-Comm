import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, redirect, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, path }) => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.reducer);
  const user = selector?.user;
  if (!user) {
    navigate("/signin");
  }
  return <Route path={path} element={element} />;
};

export default PrivateRoute;
