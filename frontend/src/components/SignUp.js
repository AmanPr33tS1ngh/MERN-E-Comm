import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      return toast.error("User with the same email already exists");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="max-w-md mx-auto">
      <title>Sign Up</title>
      <h1 className="my-3 text-xl">Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
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
          <label htmlFor="confirmPass" className="block">
            Confirm Password
          </label>
          <input
            id="confirmPass"
            type="password"
            required
            onChange={(e) => setConfirmPass(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <div className="mb-3">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
