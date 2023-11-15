import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
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

        <div className="flex items-center p-2 bg-slate-100 rounded">
          <input
            className="outline-none rounded-lg bg-transparent w-24 sm:w-64"
            type="text"
            name=""
            id=""
            placeholder="Search..."
          />
          <FaSearch />
        </div>
        <ul className="flex gap-4 text-xs text-slate-700 font-bold  ">
          <li className="hidden sm:inline hover:underline">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="hidden sm:inline hover:underline">
            <Link to={"/about"}>ABOUT</Link>
          </li>
          <li className="hover:underline">
            <Link to={"/login"}>LOGIN</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
