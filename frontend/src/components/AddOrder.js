import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("/api/products", {
        name: String(name),
        slug: String(slug),
        brand: String(brand),
        image: String(image),
        category: String(category),
        description: String(description),
        price: Number(price),
        countInStock: Number(countInStock),
        rating: Number(rating),
        numReviews: Number(numReviews),
      });
      console.log(data);
      toast.success("product added");
      navigate("/admin");
    } catch (err) {
      return toast.error("there was some error while adding product");
    }
  };

  return (
    <div className="container mx-auto">
      <title>Add Order</title>
      <h1 className="my-3 text-3xl font-bold">Add Order</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="block">Name of product</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Slug</label>
          <input
            className="form-input"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Image</label>
          <input
            className="form-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Brand</label>
          <input
            className="form-input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Price</label>
          <input
            className="form-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Category</label>
          <input
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Description</label>
          <input
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Count In Stock</label>
          <input
            className="form-input"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Rating</label>
          <input
            className="form-input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Number of Reviews</label>
          <input
            className="form-input"
            value={numReviews}
            onChange={(e) => setNumReviews(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
