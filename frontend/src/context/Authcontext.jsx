import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  googleAuth,
  loginUser,
  logoutUser,
  signUpUser,
} from "../helpers/apiCommunicator";
import { useNavigate } from "react-router-dom";
const GlobalContext = createContext(null);

const Authcontext = ({ children }) => {
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    try {
      const data = await checkAuthStatus();
      const user = data.user;

      if (user) {
        setUser({
          username: user.username,
          email: user.email,
          password: user.password,
          avatar: user.avatar.trim(),
        });

        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        console.log(e);
      }
    } catch (e) {
      setUser(null);
      setIsLoggedIn(false);
    }
    // console.log("here======================================" + user.email);
  };
  useEffect(() => {
    // fetch if the user cookies are valid then skip login
    checkStatus();
  }, []);

  const signup = async (email, name, password) => {
    // Replace this with your actual signup logic
    try {
      // Simulate a successful signup
      const data = await signUpUser(email, name, password);
      setError("");
      if (data) {
        setUser({
          username: data.username,
          email: data.email,
          avatar: data.avatar.trim(),
        });
        setIsLoggedIn(true);
        console.log(data);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (e) {
      setUser(null);
      setError(e.message);
      setIsLoggedIn(false);
      throw e; // Handle signup error
    }
  };
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      if (data) {
        setUser({
          username: data.username,
          email: data.email,
          avatar: data.avatar.trim(),
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (e) {
      setUser(null);
      setIsLoggedIn(false);
      throw e;
    }
  };

  const googleAuthSign = async (email, avatar) => {
    try {
      const data = await googleAuth(email, avatar);
      console.log(data);
      if (data) {
        setUser({
          username: data.username,
          email: data.email,
          avatar: data.user.avatar.trim(),
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (e) {
      setUser(null);
      setIsLoggedIn(false);
      throw e;
    }
  };

  const logout = async () => {
    // Replace this with your actual logout logic
    const data = await logoutUser();
    console.log(data);
    setUser({ email: "", name: "", password: "" });
    setIsLoggedIn(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        signup,
        error,
        user,
        logout,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        googleAuthSign,
        checkStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(GlobalContext);
};

export default Authcontext;
