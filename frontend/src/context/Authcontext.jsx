import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  createListing,
  deleteListing,
  getAllListings,
  getParticularListing,
  googleAuth,
  loginUser,
  logoutUser,
  signUpUser,
  updateParticularListing,
  updateUser,
} from "../helpers/apiCommunicator";
import { useNavigate } from "react-router-dom";
const GlobalContext = createContext(null);

const Authcontext = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState({});
  const [allUserListingData, setAllUserListingData] = useState([]);

  const checkStatus = async () => {
    try {
      const data = await checkAuthStatus();
      const user = data.user;

      if (user) {
        setUser({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          avatar: user.avatar.trim(),
        });

        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
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
        console.log(data.user.avatar);
        setUser({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar.trim(),
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
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
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

  const update = async (id, change) => {
    try {
      const data = await updateUser(id, change);
      if (data) {
        setUser({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar.trim(),
        });
        setIsLoggedIn(true);
      }
    } catch (e) {
      throw e;
    }
  };

  const googleAuthSign = async (email, avatar) => {
    try {
      const data = await googleAuth(email, avatar);
      console.log(data);
      if (data) {
        setUser({
          id: data.id,
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
  const addListing = async (items) => {
    try {
      const data = await createListing(items);
      if (data) {
        console.log("here===================>" + JSON.stringify(data.listing));
        return data.listing;
      }
    } catch (e) {
      throw e;
    }
  };

  const allUserListings = async () => {
    try {
      const data = await getAllListings();
      if (data) {
        return data.user.listings;
      }
    } catch (e) {
      throw e;
    }
  };

  const deleteUserListing = async (listingId) => {
    try {
      console.log("starting");
      const data = await deleteListing(listingId);
      if (data) {
        console.log(data);
      }
    } catch (e) {
      throw e;
    }
  };

  const getListing = async (listingId) => {
    try {
      const data = await getParticularListing(listingId);
      if (data) {
        return data.listing;
      }
    } catch (e) {
      throw e;
    }
  };

  const updateListing = async (listingId, items) => {
    try {
      const data = await updateParticularListing(listingId, items);
      if (data) {
        return data.listing;
      }
    } catch (e) {
      throw e;
    }
  };
  const logout = async () => {
    // Replace this with your actual logout logic
    const data = await logoutUser();
    console.log(data);
    setUser({ id: "", email: "", name: "", password: "" });
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
        update,
        addListing,
        allUserListings,
        deleteUserListing,
        getListing,
        updateListing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(GlobalContext);
};

// {user,isloggedin,logout}= usecontext(globalcontext)
export default Authcontext;
