import express from "express";
import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const products = await Cart.find();
  res.send(products);
});

cartRouter.get("/:id", async (req, res) => {
  const product = await Cart.findById(req.params.id);

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
    const newCart = new Cart({
      user: req.user._id,
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

    const cart = await newCart.save();
    res.status(201).send({ message: "New ORder created: ", cart });
  })
);

cartRouter.put(
  "/:id/:quantity",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const quantity = req.params.quantity;

    const cart = await Cart.findById(id);

    cart.quantity = quantity;
    cart.totalPrice = req.body.totalPrice;

    const updated = await cart.save();

    res.status(201).send({ message: " ORder updated: ", updated });
  })
);

cartRouter.delete(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Cart.deleteMany();
    console.log(products);
    res.status(201).send({ message: " ORders delted: ", products });
  })
);
cartRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const cart = await Cart.findById(id);
    const products = await Cart.deleteOne(cart);
    console.log(cart);
    res.status(201).send({ message: "ORder deleted: ", cart });
  })
);
export default cartRouter;
