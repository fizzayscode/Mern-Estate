import React, { useState } from "react";
import { useAuth } from "../context/Authcontext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("signing in...", { id: "login" });
      await auth?.login(loginData.email, loginData.password);
      toast.success("signed in successfully", { id: "login" });
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.message, { id: "login" });
      console.log(e);
    }
  };

  const handlechange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center py-3 text-3xl font-bold my-7">SIGN IN</h1>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col gap-4 self-center justify-center align-middle"
        >
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
            SIGN IN
          </button>

          <Oauth text="SIGN IN WITH GOOGLE" />
        </form>
        <div className="flex py-3 text-sm font-semibold ">
          <span>Already have an Account?</span>
          <span>
            <Link className="text-blue-500 px-2" to={"/sign-up"}>
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
