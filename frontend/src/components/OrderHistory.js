import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user/${id}`);
        setOrders(response.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="mb-4">
            <div className="border-b border-gray-200 pb-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4">
                  <div className="mr-4">
                    <Link to={`/product/${item.slug}`}>
                      <img
                        className="rounded-full h-16 w-16 object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>
                  </div>
                  <div>
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-lg font-semibold"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-500">
                      Quantity: {item.quantity} | Total Price Paid:{" "}
                      {item.totalPrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-lg">No Orders Right Now... Go Shop!</div>
      )}
    </div>
  );
};

export default OrderHistory;
