import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Product = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  const notify = () => {
    toast("Item added to Cart", { position: toast.POSITION.TOP_CENTER });
  };

  const addToCart = async (e) => {
    e.stopPropagation();
    const cartProduct = {
      name: product.name,
      slug: product.slug,
      image: product.image,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      rating: product.rating,
      quantity: 1,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
      totalPrice: product.price,
    };

    try {
      const { data } = await axios.post(`/api/cart/`, cartProduct);
      notify();
      navigate("/");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <div onClick={() => navigate(`/product/${product.slug}`)}>
        <img
          src={product.image}
          alt={product.name}
          class="h-80 w-72 object-cover rounded-t-xl"
        />
        <div class="px-4 py-3 w-72">
          <span class="text-gray-400 mr-3 uppercase text-xs">
            {product.brand}
          </span>
          <p class="text-lg font-bold text-black truncate block capitalize">
            {product.name}
          </p>
          <div class="flex items-center">
            <p class="text-lg font-semibold text-black cursor-auto my-3">
              ${product.price}
            </p>
            {/* Discount */}
            {/* <del> 
              <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
            </del> */}
            <button onClick={addToCart} class="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
          <div className="reviews">
            <Ratings rating={product.rating} numReviews={product.numReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
