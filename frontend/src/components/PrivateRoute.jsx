import React, { useEffect, useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const PrivateRoute = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Assuming auth.checkAuthentication is an asynchronous function
      await auth?.checkStatus();
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  if (loading) {
    // You can return a loading indicator or null while checking authentication
    return <div>Loading...</div>;
  }

  return <div>{auth?.isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
