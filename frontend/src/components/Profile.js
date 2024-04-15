import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div>
      <title>User Profile</title>
      <h1 className="my-3">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-300 rounded">
          <div className="my-3">User: {userInfo.name}</div>
        </div>
        <div className="p-4 border border-gray-300 rounded">
          <div className="my-3">User Email: {userInfo.email}</div>
        </div>
        <div className="p-4 border border-gray-300 rounded">
          <div className="my-3">
            <Link to={"/update-user"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
