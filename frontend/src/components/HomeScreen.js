import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import LoadingBox from "./SpinnerLoading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeScreen = () => {
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div>
      <div>
        <h3 className="my-1">Swipe to See More Products</h3>
        <div className="slider-carousel">
          <Slider {...settings}>
            {products ? (
              products.map((product) => (
                <div key={product.slug}>
                  <Product product={product} />
                </div>
              ))
            ) : (
              <div>
                <LoadingBox />
              </div>
            )}
          </Slider>
        </div>
        <hr className="my-4" />
        <main>
          <h1 className="text-3xl font-semibold">Featured Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {products ? (
              products.map((product) => (
                <div key={product.slug}>
                  <Product product={product} />
                </div>
              ))
            ) : (
              <div>
                <LoadingBox />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
