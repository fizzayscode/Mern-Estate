import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";

const Header = () => {
  const auth = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const searchItem = urlparams.get("searchTerm");
    if (searchItem) {
      setSearchTerm(searchItem);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlparams = new URLSearchParams(window.location.search);
    urlparams.set("searchTerm", searchTerm);
    const searchQuery = urlparams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className=" bg-slate-200 shadow-md px-2 ">
      <div className="flex justify-between max-lg py-3 flex-wrap items-center max-w-6xl mx-auto">
        <div>
          <Link to={"/"}>
            <h1 className="font-bold text-sm sm:text-xl">
              <span className="text-slate-500">Fizzay</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center p-2 bg-slate-100 rounded"
        >
          <input
            className="outline-none rounded-lg bg-transparent w-24 sm:w-64"
            type="text"
            name=""
            id=""
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
          <FaSearch className="cursor-pointer" onClick={handleSubmit} />
        </form>
        <ul className="flex gap-4 text-xs text-slate-700 font-bold  ">
          <li className="hidden sm:inline hover:underline self-center">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="hidden sm:inline hover:underline self-center">
            <Link to={"/about"}>ABOUT</Link>
          </li>
          {auth?.isLoggedIn ? (
            <li className="hover:underline self-center">
              <Link to={`/profile/${auth?.user?.id}`}>
                <img
                  className="rounded-full w-8 h-8"
                  src={auth?.user.avatar}
                  alt=""
                />
              </Link>
            </li>
          ) : (
            <li className="hover:underline">
              <Link to={"/login"}>LOGIN</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
