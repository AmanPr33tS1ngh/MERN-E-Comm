import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./SignIn.css";
import PopUpModal from "../CommonModal/PopUpModal";
import { useDispatch } from "react-redux";
import { AUTHENTICATE } from "../../Store/ActionTypes";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: null,
    password: null,
    signUp: false,
    username: null,
    confirmPassword: null,
    popUpMsg: {
      msg: null,
      type: false,
    },
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const LogIn = async (e) => {
    try {
      e.preventDefault();
      if (state.confirmPassword !== state.password) {
        setState({
          ...state,
          popUpMsg: {
            msg: "Passwords does not match.",
            type: false,
          },
        });
      }
      const data = state.signUp
        ? {
            email: state.email,
            password: state.password,
            username: state.username,
            confirmPassword: state.confirmPassword,
          }
        : {
            email: state.email,
            password: state.password,
          };
      let endpoint = `/api/users/${state.signUp ? "sign_up" : "sign_in"}`;
      await axios.post(endpoint, data).then((res) => {
        let responseData = res.data;
        console.log("ress", responseData);
        if (!responseData.success) {
          setState({
            ...state,
            popUpMsg: {
              msg: responseData.message,
              type: responseData.success,
            },
          });
          return;
        }
        dispatch({
          type: AUTHENTICATE,
          payload: responseData.user,
        });
        navigate("/");
      });
    } catch (err) {
      console.log("err", err);
      return toast.error("there was some error while adding product");
    }
  };
  const closeModal = () => {
    setState({
      ...state,
      popUpMsg: {
        msg: null,
        type: false,
      },
    });
  };
  const signInUp = () => {
    setState({ ...state, signUp: !state.signUp });
  };
  return (
    <div className="d-flex se h-100 my-8 mx-5 w-100">
      <div className="right-panel m-auto">
        <div className="w-80 m-auto">
          <h1 className="text-align heading">
            {state.signUp ? "Create Your Account" : "Login To Your Account"}
          </h1>
          <form className="m-auto w-45" onSubmit={LogIn}>
            {state.signUp ? (
              <div>
                <input
                  className="sign-in-input"
                  placeholder="Username"
                  name="username"
                  value={state.username}
                  onChange={handleChange}
                ></input>
                <input
                  className="sign-in-input"
                  placeholder="Email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                ></input>
                <input
                  className="sign-in-input"
                  placeholder="Password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                ></input>
                <input
                  className="sign-in-input"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={state.confirmPassword}
                  onChange={handleChange}
                ></input>
              </div>
            ) : (
              <div>
                <input
                  className="sign-in-input"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={state.email}
                ></input>
                <input
                  className="sign-in-input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={state.password}
                ></input>
              </div>
            )}
            <div className="d-flex center">
              <button className="sign-in-btn">
                {state.signUp ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="left-panel d-grid m-auto c-white">
        <div className="px-5">
          <h1 className="text-align heading">
            {state.signUp ? "Already have an Account?" : "New Here?"}
          </h1>
          <h5 className="text-align sub-heading">
            {state.signUp
              ? "Sign in and look at variety of products"
              : "Sign up and have a look at variety of things on our site"}
          </h5>
          <div className="d-flex center">
            <button
              className="sign-in-btn"
              style={{ background: "white", color: "black" }}
              onClick={signInUp}
            >
              {state.signUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
      {state.popUpMsg.msg ? (
        <PopUpModal
          msg={state.popUpMsg.msg}
          success={state.popUpMsg.type}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
};

export default SignIn;
