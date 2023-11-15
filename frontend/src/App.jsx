import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
