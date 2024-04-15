import React from "react";

const CheckOutSteps = (props) => {
  return (
    <div className="check-steps">
      <div className="flex justify-between checkout-steps">
        <div className={`w-1/4 ${props.step1 ? "active" : ""}`}>Sign-In</div>
        <div className={`w-1/4 ${props.step2 ? "active" : ""}`}>Shipping</div>
        <div className={`w-1/4 ${props.step3 ? "active" : ""}`}>Payment</div>
        <div className={`w-1/4 ${props.step4 ? "active" : ""}`}>
          Place Order
        </div>
      </div>
    </div>
  );
};

export default CheckOutSteps;
