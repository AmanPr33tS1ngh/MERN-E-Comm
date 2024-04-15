import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutSteps from "./CheckOutSteps";

const PlaceOrder = () => {
  const navigate = useNavigate();

  // Retrieve cart items and user info from localStorage
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const paymentMethod = localStorage.getItem("paymentMethod");
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  // Redirect to payment page if payment method is not selected
  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  // Calculate prices
  let itemsPrice = 0;
  let shippingPrice = 0;
  let taxPrice = 0;
  let totalPrice = 0;

  if (cart) {
    cart.forEach((item) => {
      itemsPrice += item.totalPrice;
      shippingPrice += item.price / 3;
      taxPrice += item.price / 30;
    });
  }

  totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Place order handler
  const placeOrderHandler = async () => {
    try {
      // Delete cart items
      await axios.delete("api/cart");

      // Create order object
      const order = {
        orderItems: cart,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isDelivered: false,
        isPaid: false,
        user: userInfo,
        userId: userInfo._id,
      };

      // Post order to server
      const { data } = await axios.post("api/orders", order);

      // Display success message
      toast.success("Order Placed");

      // Clear cartItems from localStorage
      localStorage.removeItem("cartItems");

      // Navigate to order page
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      // Display error message
      toast.error("There was some error");
    }
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <h1 className="text-3xl font-bold mb-4">Preview Order</h1>

      {cart && (
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 pr-4">
            {/* Shipping Address */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Shipping</h2>
              <p>
                <strong>Name:</strong> {shippingAddress.fullName} <br />
                <strong>Address:</strong>{" "}
                {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
              </p>
              <Link className="text-blue-500 hover:underline" to="/shipping">
                Click here to edit
              </Link>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
              <p>{paymentMethod}</p>
              <Link className="text-blue-500 hover:underline" to="/payment">
                Click here to edit
              </Link>
            </div>

            {/* Cart Items */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Items</h2>
              {cart.map((item) => (
                <div key={item._id} className="mb-4 border-b pb-4">
                  {/* Display cart item */}
                  {/* Your cart item display code goes here */}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              <div className="mb-2">
                <strong>Items:</strong> ${itemsPrice.toFixed(2)}
              </div>
              <div className="mb-2">
                <strong>Shipping:</strong> ${shippingPrice.toFixed(2)}
              </div>
              <div className="mb-2">
                <strong>Tax:</strong> ${taxPrice.toFixed(2)}
              </div>
              <div className="mb-2">
                <strong>Total:</strong> ${totalPrice.toFixed(2)}
              </div>
            </div>
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={totalPrice === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
