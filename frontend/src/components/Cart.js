import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/cart");
        setCartItems(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const subtotal_price = cartItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const checkoutHandler = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate("/shipping");
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      toast.success("Item deleted successfully");
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("There was some error while deleting");
    }
  };

  return (
    <div className="container mx-auto">
      <title>Shopping Cart</title>
      <div className="md:flex justify-between">
        <div className="md:w-2/3">
          {cartItems.length === 0 ? (
            <div>
              <h1>Cart is empty</h1>
              <Link className="text-white" to={"/"}>
                Click here to Go Shopping
              </Link>
            </div>
          ) : (
            <div>
              <h1>Cart</h1>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-4 flex">
                    <div className="md:w-1/4">
                      <img
                        className="img-fluid rounded img-thumbnail"
                        src={item.image}
                        alt={item.name}
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </div>
                    <div className="md:w-2/4">${item.totalPrice}</div>
                    <div className="md:w-1/4">
                      <button
                        onClick={() => navigate(`/cart/edit/${item._id}`)}
                        className="btn btn-dark mx-1"
                      >
                        +
                      </button>
                      <button
                        onClick={() => navigate(`/cart/edit/${item._id}`)}
                        className="btn btn-dark mx-1"
                      >
                        -
                      </button>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="btn btn-dark mx-1"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:w-1/3">
          <div className="card">
            <div className="card-body">
              <h3 className="font-bold">
                Subtotal: ({cartItems.length} items): ${subtotal_price}
              </h3>
              <button
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="btn btn-dark"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
