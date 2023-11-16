import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useAuth } from "../context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Oauth = ({ text }) => {
  const contextAuth = useAuth();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result.user.email);
      const email = result.user.email;
      const photo = result.user.photoURL;

      toast.loading("signing in user", { id: "google" });
      await contextAuth.googleAuthSign(email, photo);
      toast.success("signed in successfully", { id: "google" });

      navigate("/");
    } catch (e) {
      //   toast.error(e.response.data.message, { id: "google" });
      console.log(e);
    }
  };
  return (
    <button
      className="font-bold bg-red-700 rounded-lg text-white py-2 hover:opacity-90"
      type="button"
      onClick={handleGoogleClick}
    >
      {text}
    </button>
  );
};

export default Oauth;
