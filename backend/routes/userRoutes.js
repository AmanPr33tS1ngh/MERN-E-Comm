import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const UserRouter = express.Router();

UserRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        msg: "Please enter both email and password",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send({ msg: "invalid email or pass", success: false });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.send({
        msg: "Please enter correct password",
        success: false,
      });
    }
    const token = generateToken(user);
    console.log("token", token);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
      success: true,
      msg: "Logged in successfully",
    });
  })
);

UserRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password, confirmPass } = req.body;
    console.log(
      "password, confirmPass",
      password,
      confirmPass,
      email !== confirmPass,
      typeof email,
      typeof confirmPass
    );
    if (!(name && email && password && confirmPass)) {
      return res.send({
        msg: "Please enter all fields",
        success: false,
      });
    }
    if (password !== confirmPass) {
      return res.send({
        msg: "Passwords do not match",
        success: false,
      });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password),
    });
    const user = await newUser.save();

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
      msg: "User created",
      success: true,
    });
  })
);
UserRouter.put(
  "/profile/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password);
      }

      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default UserRouter;
