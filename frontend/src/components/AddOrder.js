import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    image: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    countInStock: "",
    rating: "",
    numReviews: "",
  });
  const changeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/products", product);
      console.log("data", data);
      if (!data.success) {
        toast.error(data.msg);
        return;
      }
      console.log(data);
      toast.success("product added");
      navigate("/admin");
    } catch (err) {
      return toast.error("there was some error while adding product " + err);
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
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.name}
            name="name"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Slug</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.slug}
            name="slug"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Image</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.image}
            name="image"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Brand</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.brand}
            name="brand"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Price</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.price}
            name="price"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Category</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.category}
            name="category"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Description</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.description}
            name="description"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Count In Stock</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.countInStock}
            name="countInStock"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Rating</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.rating}
            name="rating"
            onChange={changeProduct}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block">Number of Reviews</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product.numReviews}
            name="numReviews"
            onChange={changeProduct}
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
