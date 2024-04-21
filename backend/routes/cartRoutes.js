import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Cart, CartItems } from "../models/cartModel.js";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";

const cartRouter = express.Router();

cartRouter.get("/", isAuth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.send({ success: false, msg: "Cart not found", cart: [] });
  }
  res.send({ success: true, msg: "Cart found", cart: cart });
});

cartRouter.get("/:id", async (req, res) => {
  const product = await Cart.findOne(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

cartRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const cartItem = new CartItems({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        quantity: req.body.quantity,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock,
        totalPrice: req.body.totalPrice,
      });
      let userCart = await findOne({
        user: req.user._id,
      });
      if (!userCart) {
        userCart = new Cart({
          user: req.user._id,
        });
      }
      userCart.cartItems.unshift(cartItem);
      const cart = await userCart.save();
      res.send({ success: true, message: "New cartItem added: ", cart: cart });
    } catch (e) {
      res.send({ success: false, message: `Err while adding cartItem ${e}` });
    }
  })
);

cartRouter.put(
  "/:id/:quantity",
  expressAsyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const quantity = req.params.quantity;

    let cart = await Cart.findOne({
      user: req.user._id,
    });
    if (!cart) {
      res.send({ success: false, message: "Order not updated" });
    }
    const cartItemToBeUpdated = cart.cartItems.filter(
      (cartItem) => cartItem.slug === slug
    );
    cartItemToBeUpdated.quantity = quantity;
    cartItemToBeUpdated.totalPrice = cartItemToBeUpdated.price * quantity;
    const updatedCart = await cart.save();
    res.send({ success: true, message: " Order updated: ", updatedCart });
  })
);

cartRouter.delete(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    cart.cartItems = [];
    const updatedCart = await cart.save();
    res.send({ message: " Orders delted: ", updatedCart: updatedCart });
  })
);

export default cartRouter;
