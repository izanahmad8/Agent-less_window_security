import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        alert("Login successful");
        localStorage.setItem("token", response.data.token);
        navigate("/chats");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Log in</h1>
          <input
            onChange={handleChange}
            value={email}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            onChange={handleChange}
            value={password}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1"
          >
            Log in
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Not have an account?
          <Link className="border-b border-blue-500 text-red-500" to="/signup">
            Sign up
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
