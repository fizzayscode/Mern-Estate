import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const PrivateRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return <div>{auth.isLoggedIn ? <Outlet /> : navigate("/login")}</div>;
};

export default PrivateRoute;
