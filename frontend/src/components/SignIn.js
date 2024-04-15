import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirect : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cartItems = localStorage.getItem("cartItems");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error("Invalid email or password");
    }
    if (cartItems === null) {
      navigate("/");
    } else {
      navigate("/shipping");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="max-w-md mx-auto">
      <title>Sign In</title>
      <h1 className="my-3 text-xl">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`} className="text-blue-500">
            Create your Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
