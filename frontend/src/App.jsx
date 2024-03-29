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
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/Authcontext";
import CreateListing from "./pages/CreateListing";
import ParticularListing from "./pages/ParticularListing";
import EditListing from "./pages/EditListing";
import SearchListing from "./pages/SearchListing";

function App() {
  const auth = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="listing/:id" element={<ParticularListing />} />
        <Route path="/search" element={<SearchListing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="profile/listing/edit/:id" element={<EditListing />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
