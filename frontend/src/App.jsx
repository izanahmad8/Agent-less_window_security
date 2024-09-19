import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Services from "./components/Services";
import Chats from "./components/Chats";
import Video from "./components/Video";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      <Video />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/downloads" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/chats" element={<Chats />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
