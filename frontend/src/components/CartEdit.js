import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/cart/${id}`);
        setCartItems(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const updateHandler = async () => {
    const totalPrice = quantity * cartItems.price;
    localStorage.setItem("totalPrice", totalPrice);

    try {
      const result = await axios.put(`/api/cart/${id}/${quantity}`, {
        totalPrice: totalPrice,
      });
      toast.success("Item updated successfully");
      navigate("/cart");
    } catch (err) {
      toast.error("There was some error while updating");
    }
  };

  if (!cartItems) return <div>Loading...</div>;

  const totalPrice = quantity * cartItems.price;

  return (
    <div className="container mx-auto">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            className="img-large"
            src={cartItems.image}
            alt={cartItems.name}
          />
        </div>
        <div className="md:w-1/4">
          <h1 className="text-xl font-bold">{cartItems.name}</h1>
          <p>Price: ${cartItems.price}/piece</p>
          <p>Description: {cartItems.description}</p>
          <div className="flex items-center">
            <button
              onClick={decreaseQuantity}
              className="btn btn-dark mx-3"
              disabled={quantity <= 1}
            >
              -
            </button>
            <button className="btn btn-dark mx-3">{quantity}</button>
            <button
              onClick={increaseQuantity}
              className="btn btn-dark mx-3"
              disabled={quantity >= cartItems.countInStock}
            >
              +
            </button>
          </div>
          <button onClick={updateHandler} className="btn btn-dark my-3">
            Update
          </button>
        </div>
        <div className="md:w-1/4">
          <div className="card">
            <div className="card-body">
              <p>Total Price: ${totalPrice}</p>
              <p>
                Status:{" "}
                {cartItems.countInStock > 0 ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-2 py-1 rounded">
                    Unavailable
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartEdit;
