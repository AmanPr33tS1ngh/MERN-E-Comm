import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDeleteProductScreen = (props) => {
  const navigate = useNavigate();
  const { product } = props;

  const deleteHandler = (id) => {
    const req = async () => {
      try {
        const result = await axios.delete(`/api/products/${id}`);
        toast.success("Item deleted Successfully");
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    req().then(() => navigate("/admin"));
  };

  return (
    <div>
      <div>
        <div className="card m-3" style={{ width: "18rem" }}>
          <Link to={`/product/${product.slug}`}>
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
            />
          </Link>
          <div className="card-body">
            <Link className="text-white" to={`/product/${product.slug}`}>
              <p>{product.name}</p>
            </Link>
            <p>
              <strong>${product.price}</strong>
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => deleteHandler(product._id)}
                className="btn btn-dark mx-3"
              >
                Delete Product
              </button>
              <button
                onClick={() => navigate(`/edit-order/${product._id}`)}
                className="btn btn-dark"
              >
                Edit
              </button>
            </div>
            <div className="reviews">
              <Ratings
                rating={product.rating}
                numReviews={product.numReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDeleteProductScreen;
