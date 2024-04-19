import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "./SpinnerLoading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  console.log("product screen");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`/api/products/slug/${slug}`);
        setProduct(result.data);
        setLoading(false);
      } catch (err) {
        toast.error("There was some error");
      }
    };
    fetchData();
  }, [slug]);

  const notify = () => {
    toast("Item added to Cart", { position: toast.POSITION.TOP_CENTER });
  };

  const addToCartHandle = async () => {
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
    const data = await axios.post(`/api/cart/`, cartProduct);
    notify();
    navigate("/");
  };

  return loading ? (
    <LoadingBox />
  ) : (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 flex justify-center">
        <img
          className="object-contain h-96"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="md:w-1/2 p-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center">
          <div className="mr-2">
            <span className="text-lg font-semibold">Rating:</span>
          </div>
          <div className="mr-2">
            <span>{product.rating}</span>
          </div>
          <div className="mr-2">
            <span>({product.numReviews} reviews)</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-lg font-semibold">Price:</span>
          <span className="ml-2">${product.price}</span>
        </div>
        <div className="mt-2">
          <span className="text-lg font-semibold">Description:</span>
          <p className="ml-2">{product.description}</p>
        </div>
        <div className="mt-4">
          <span className="text-lg font-semibold">Status:</span>
          <span className="ml-2">
            {product.countInStock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Unavailable</span>
            )}
          </span>
        </div>
        {product.countInStock > 0 && (
          <button
            onClick={addToCartHandle}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
