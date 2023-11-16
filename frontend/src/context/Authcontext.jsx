import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  googleAuth,
  loginUser,
  signUpUser,
} from "../helpers/apiCommunicator";
import { useNavigate } from "react-router-dom";
const GlobalContext = createContext(null);

const Authcontext = ({ children }) => {
  const [user, setUser] = useState({ username: "", email: "", avatar: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch if the user cookies are valid then skip login
    const checkStatus = async () => {
      try {
        const data = await checkAuthStatus();
        const user = data.user;
        console.log(user);
        if (user) {
          setUser({
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: user.avatar.trim(),
          });
          console.log(user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          console.log(e);
        }
        console.log(data);
      } catch (e) {
        setUser(null);
        setIsLoggedIn(false);
        console.log(e);
      }
      // console.log("here======================================" + user.email);
    };
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

  return (
    <GlobalContext.Provider
      value={{
        signup,
        error,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        googleAuthSign,
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
