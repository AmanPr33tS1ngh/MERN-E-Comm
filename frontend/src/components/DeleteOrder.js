import axios from "axios";
import React, { useEffect, useState } from "react";
import EditDeleteProductScreen from "./EditDeleteProductScreen";
import LoadingBox from "./SpinnerLoading";

const DeleteOrder = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/products");
        setProducts(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products ? (
          products.map((product) => (
            <EditDeleteProductScreen key={product.slug} product={product} />
          ))
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
};

export default DeleteOrder;
