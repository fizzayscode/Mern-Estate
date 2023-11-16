import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [signUpData, setsignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setsignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("signing up user", { id: "signup" });
      await auth?.signup(
        signUpData.username,
        signUpData.email,
        signUpData.password
      );
      toast.success("signed up successfully", { id: "signup" });
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.message, { id: "signup" });
      console.log(e);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center py-3 text-3xl font-bold my-7">SIGN UP</h1>
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-4 self-center justify-center align-middle"
      >
        <input
          className="p-3 outline-none border rounded-lg"
          type="text"
          placeholder="username"
          name="username"
          onChange={handlechange}
        />
        <input
          className="p-3 outline-none border rounded-lg"
          type="email"
          placeholder="email"
          name="email"
          onChange={handlechange}
        />
        <input
          className=" p-3 outline-none border rounded-lg"
          type="password"
          placeholder="password"
          name="password"
          onChange={handlechange}
        />
        <button
          type="submit"
          className="font-bold bg-slate-700 rounded-lg text-white py-2 hover:opacity-90 disabled:opacity-80"
        >
          SIGN UP
        </button>
        <Oauth text="SIGN UP WITH GOOGLE" />
      </form>
      <div className="flex py-3 text-sm font-semibold ">
        <span>Already have an Account?</span>
        <span>
          <Link className="text-blue-500 px-2" to={"/login"}>
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
