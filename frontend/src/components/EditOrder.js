import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/${id}`);
        setProduct(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSlug(product.slug);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setRating(product.rating);
      setNumReviews(product.numReviews);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`/api/products/${id}`, {
        name,
        slug,
        description,
        rating: Number(rating),
        numReviews: Number(numReviews),
        image,
        brand,
        category,
        countInStock: Number(countInStock),
        price: Number(price),
      });
      toast.success("Product updated successfully");
      navigate("/delete-order");
    } catch (err) {
      toast.error("There was some error while updating product");
    }
  };

  return (
    <div>
      <title>Edit Order</title>
      <h1 className="my-3">Edit Order</h1>

      {product ? (
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="fullName" className="block">
              Name of product
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="slug" className="block">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="block">
              Image
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="block">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="block">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="block">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="count" className="block">
              Count In Stock
            </label>
            <input
              type="number"
              id="count"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="block">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reviews" className="block">
              Number of Reviews
            </label>
            <input
              type="number"
              id="reviews"
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EditOrder;
