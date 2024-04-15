import React, { useEffect, useState } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const [paymentMethodName, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="container small-container">
        <title>Payment method</title>
        <h1 className="my-3 text-3xl font-bold">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <input
              type="radio"
              id="Paytm"
              value="Paytm"
              checked={paymentMethodName === "Paytm"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="Paytm" className="font-semibold">
              Paytm
            </label>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
