import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AllOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Preview</h1>
      {order && order.shippingAddress && (
        <div className="my-4">
          <h5 className="font-bold">
            Order From {order.shippingAddress.fullName}
          </h5>
          <p>
            Address: {order.shippingAddress.address},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.country}
          </p>
          <div className="mt-4">
            <div className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between">
                <div className="w-1/2">
                  <p className="font-bold">
                    Price Paid By Customer: ${order.totalPrice.toFixed(2)} (
                    {order.paymentMethod})
                  </p>
                </div>
                <div className="w-1/2 text-right">
                  (including taxes and shipping charges)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {order && order.orderItems ? (
          order.orderItems.map((item, index) => (
            <div key={index} className="my-4">
              <div className="border border-gray-300 rounded p-4">
                <div className="flex items-center">
                  <div className="w-1/4">
                    <img
                      className="img-large"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="w-3/4 ml-4">
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    <p>Price: ${item.totalPrice}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center my-4">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AllOrderDetails;
