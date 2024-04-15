import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const signOutHandler = async () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("cartItems");
    navigate("/signin");
    await axios.delete(`/api/cart`);
    toast.error("Logged out");
  };

  return (
    <nav className="bg-gray-800 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <Link to="/" className="text-white text-xl font-bold">
              Store
            </Link>
            <Link to="/cart" className="ml-4 text-white">
              Cart
            </Link>
          </div>
          <div className="flex items-center">
            {userInfo ? (
              <div className="relative">
                <button className="text-white focus:outline-none">
                  {userInfo.name}
                </button>
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/order-history/${userInfo._id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Order History
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={signOutHandler}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="text-white">
                Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <Link to="/admin" className="ml-4 text-white">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
