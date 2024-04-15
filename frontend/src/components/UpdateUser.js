import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return toast.error("Passwords do not match");
    }
    try {
      const data = await axios.put(`/api/users/profile/${userInfo._id}`, {
        name,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      toast.success("User updated successfully");
      navigate("/");
    } catch (err) {
      toast.error("Error updating user");
    }
  };

  return (
    <div>
      <title>User Profile</title>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
