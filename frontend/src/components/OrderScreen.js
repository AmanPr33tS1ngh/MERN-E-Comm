import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import paytm from "../paytm.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderScreen = () => {
  const [modal, setModal] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`/api/orders/${orderId}`);
        setOrder(data.data);
        setLoading(false);
      } catch (err) {
        toast.error("There was some error");
      }
    };
    fetchOrder();
  }, [orderId]);

  const modalHandler = () => {
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const paymentHandler = async () => {
    const deleteReq = async () => {
      try {
        const result = await axios.delete(`/api/cart`);
        console.log(result);
      } catch (err) {
        toast.error("There was some error");
      }
    };
    const updateReq = async () => {
      try {
        const result = await axios.put(`/api/orders/${orderId}`);
        console.log(result);
      } catch (err) {
        toast.error("There was some error");
      }
    };
    deleteReq();
    updateReq();

    navigate(`/order-history/${userInfo._id}`);
  };

  return (
    <div className="container mx-auto mt-4">
      {order ? (
        <div>
          <title>Order {orderId}</title>
          <h1 className="text-xl font-bold mb-4">Order {orderId}</h1>
          <div className="flex flex-row">
            <div className="w-8/12 mr-4">
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Shipping</h2>
                {order.shippingAddress ? (
                  <div>
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
                {order.isDelivered ? (
                  <div className="bg-blue-200 text-blue-800 p-2 rounded">
                    Delivered
                  </div>
                ) : (
                  <div className="bg-red-200 text-red-800 p-2 rounded">
                    Not Delivered
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <div className="bg-blue-200 text-blue-800 p-2 rounded">
                    Paid
                  </div>
                ) : (
                  <div className="bg-red-200 text-red-800 p-2 rounded">
                    Not Paid
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Items</h2>
                <ul>
                  {order.orderItems ? (
                    order.orderItems.map((item) => (
                      <li key={item._id} className="mb-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Link to={`/product/${item.slug}`}>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="rounded-lg w-24"
                              />
                            </Link>
                          </div>
                          <div>
                            <Link
                              to={`/product/${item.slug}`}
                              className="text-blue-600 font-bold"
                            >
                              {item.name}
                            </Link>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total Price: {item.totalPrice}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div>loading...</div>
                  )}
                </ul>
              </div>
            </div>
            <div className="w-4/12">
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                {order.itemsPrice ? (
                  <ul>
                    <li className="flex justify-between items-center mb-2">
                      <span>Items</span>
                      <span>${order.itemsPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between items-center mb-2">
                      <span>Shipping</span>
                      <span>${order.shippingPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between items-center mb-2">
                      <span>Tax</span>
                      <span>${order.taxPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between items-center mb-2">
                      <span>Order Total</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </li>
                    <li className="mb-2">
                      <Button
                        onClick={modalHandler}
                        className="bg-blue-500 text-white px-5 py-2 rounded"
                      >
                        <img src={paytm} alt="paytm" className="w-6 h-6 mr-2" />
                        Pay Now
                      </Button>
                    </li>
                  </ul>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {modal ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <Button
              onClick={closeModalHandler}
              className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded"
            >
              X
            </Button>
            <h2 className="text-lg font-bold mb-4">
              Pay ${order.totalPrice.toFixed(2)}
            </h2>
            <Button
              onClick={paymentHandler}
              className="bg-blue-500 text-white px-5 py-2 rounded"
            >
              Pay Now
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default OrderScreen;
