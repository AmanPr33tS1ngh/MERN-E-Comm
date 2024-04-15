import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await axios.get(`/api/orders/`);
        setOrder(data.data.order);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Product Changes</h1>
        <div className="flex justify-between py-2">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate(`/add-order`)}
          >
            Add Products
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate(`/delete-order`)}
          >
            Edit/Remove Products
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <h1 className="text-2xl font-bold py-4">All Orders</h1>
      {order ? (
        order.map((orderItem) => (
          <div key={orderItem._id} className="my-4">
            <div className="border border-gray-300 rounded p-4">
              {orderItem.orderItems.map((item) => (
                <div key={item._id} className="flex items-center my-2">
                  <div className="w-1/4">
                    <Link to={`/product/${item.slug}`}>
                      <img className="mx-5" src={item.image} alt={item.name} />
                    </Link>
                  </div>
                  <div className="mx-5">{item.name}</div>
                  <div className="mx-5">Quantity: {item.quantity}</div>
                  <div className="mx-5">
                    Total Price Paid : {item.totalPrice}
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => navigate(`/admin/${orderItem._id}`)}
                >
                  Check Full Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Orders RN...</div>
      )}
    </div>
  );
};

export default Admin;
