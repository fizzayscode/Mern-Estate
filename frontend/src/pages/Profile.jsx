import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const auth = useAuth();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    username: auth.user.username,
    email: auth.user.email,
    password: auth.user.password,
  });

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSignOut = async () => {
    try {
      toast.loading("signing out", { id: "signout" });
      await auth?.logout();
      toast.success("signed out successfully", { id: "signout" });
    } catch (e) {
      console.log(e);
      toast.error("sign out failed", { id: "signout" });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h2 className="text-center text-3xl font-bold ">Profile</h2>
      <form className="flex flex-col gap-3">
        <input hidden ref={fileRef} type="file" name="" id="" />
        <img
          className="rounded-full w-25 h-25 object-cover align-middle cursor-pointer self-center my-4"
          src={auth.user.avatar}
          alt="user avatar"
          onClick={() => fileRef.current.click()}
        />
        <input
          className="p-3 outline-none border rounded-lg"
          type="text"
          placeholder="username"
          name="username"
          value={updateData.username}
          onChange={handleChange}
        />
        <input
          className="p-3 outline-none border rounded-lg"
          type="email"
          placeholder="email"
          name="email"
          value={updateData.email}
          onChange={handleChange}
        />
        <input
          className="p-3 outline-none border rounded-lg"
          type="password"
          placeholder="password"
          name="password"
          value={updateData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="font-bold bg-slate-700 rounded-lg text-white py-2 hover:opacity-90 disabled:opacity-80"
        >
          UPDATE
        </button>
      </form>
      <div className="flex justify-between py-3 text-sm font-semibold text-red-700">
        <Link>
          <span>Delete Account</span>
        </Link>
        <Link>
          <span onClick={handleSignOut}>Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
