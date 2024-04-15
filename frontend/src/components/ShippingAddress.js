import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";

const ShippingAddress = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const [fullName, setFullName] = useState(
    shippingAddress ? shippingAddress.fullName : ""
  );
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <title>Shipping Address</title>
      <CheckOutSteps step1 step2 />
      <h1 className="my-3">Shipping Address</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="fullName" className="block">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="block">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="block">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postalCode" className="block">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="block">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
