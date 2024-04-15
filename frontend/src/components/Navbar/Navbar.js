import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../Store/ActionTypes";
import FaIcon from "../CommonModal/FaIcon";

const Navbar = () => {
  const store = useSelector((state) => state);
  const [state, setState] = useState({
    dropDown: false,
  });
  console.log("storeeee", store);
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  return (
    <div>
      {/* Upper Nav */}
      <nav className="upper-nav">
        <ul className="d-flex se" style={{ fontWeight: "500" }}>
          <li>
            <Link to={`/`} className="text-white">
              Store
            </Link>
          </li>
          <li>
            <Link to={"/cart"} className="text-white">
              {" "}
              Cart{" "}
            </Link>
          </li>
          {console.log("usssaaaaeeee", store.user?.name)}
          {store.user?.name ? (
            <li>
              <span className="user text-white py-2">
                {store.user?.name}&nbsp;&nbsp;&nbsp;
                <FaIcon
                  icon={"fa fa-caret-down"}
                  size={"15px"}
                  color={"white"}
                />
              </span>
              <ul className="user-options" aria-labelledby="navbarDropdown">
                <Link className="text-black" to={"/profile"}>
                  <li className="py-8">User Profile </li>
                </Link>
                <hr style={{ margin: "0" }} />
                <Link
                  className="text-black"
                  to={`/order-history/${store.user?._id}`}
                >
                  <li className="py-8">Order History </li>
                </Link>
                <hr className={"m-0"} />
                <li
                  className="py-8"
                  onClick={signOutHandler}
                  style={{ cursor: "pointer" }}
                >
                  SignOut
                </li>
              </ul>
            </li>
          ) : (
            <li className="">
              <Link className="text-white" to={"/signin"}>
                {" "}
                Sign In{" "}
              </Link>
            </li>
          )}
          {store.user && store.user?.isAdmin ? (
            <li className="">
              <Link to={"/admin"} className="text-white">
                {" "}
                Admin{" "}
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
      {/* Lower Nav */}
      <nav className="lower-nav">
        <ul className="d-flex se">
          <li>
            <Link to={"/products/:item"} className="text-white">
              Home & Kitchen
            </Link>
          </li>
          <li>
            <Link to={`/products/:item`} className="text-white">
              Mobiles
            </Link>
          </li>
          <li>
            <Link to={`/products/:item`} className="text-white">
              Televisions
            </Link>
          </li>
          <li>
            <Link to={`/products/:item`} className="text-white">
              Clothes
            </Link>
          </li>
          <li>
            <Link to={`/products/:item`} className="text-white">
              Other Electornics
            </Link>
          </li>
          {store.user && store.user?.isAdmin ? (
            <li>
              <Link to={"/admin"} className="text-white">
                {" "}
                Admin{" "}
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
