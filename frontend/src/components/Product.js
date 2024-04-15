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

  const addToCart = async () => {
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
      const data = await axios.post(`/api/cart/`, cartProduct);
      notify();
      navigate("/");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div className="card m-3" style={{ width: "18rem" }}>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <div className="card-body a-style">
          <Link className="white" to={`/product/${product.slug}`}>
            <p>{product.name}</p>
          </Link>
          <p>
            <strong>${product.price}</strong>
          </p>
          <button
            onClick={addToCart}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
          <div className="reviews">
            <Ratings rating={product.rating} numReviews={product.numReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
