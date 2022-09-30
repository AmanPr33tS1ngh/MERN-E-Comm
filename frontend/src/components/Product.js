import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Ratings from './Ratings';
import Button from 'react-bootstrap/Button'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

const Product = (props) => {
    const { product } = props;

    const navigate=useNavigate();
    const notify=()=>{
        toast(' Item added to Cart',{position:toast.POSITION.TOP_CENTER});
      }

    const addToCart=async()=>{
        const cartProduct={
            name:product.name,
                slug:product.slug,
                image:product.image,
                brand:product.brand,
                category:product.category,
                description:product.description,
                price:product.price,
                rating:product.rating,
                quantity:1,
                numReviews:product.numReviews,
                countInStock:product.countInStock,
                totalPrice:product.price
          };
          const data=await axios.post(`/api/cart/`,cartProduct);
          notify();
          navigate('/');
    }
    return (
        <div>
            <div class="card m-3" style={{width: "18rem"}}>
                <Link to={`/product/${product.slug}`}><img src={product.image} class="card-img-top" alt={product.name} /></Link>
                <div class="card-body a-style">
                    <Link className='white' to={`/product/${product.slug}`}>
                        <p>{product.name}</p>
                    </Link>
                    <p>
                        <strong>${product.price}</strong>
                    </p>
                    <Button onClick={addToCart} className='btn btn-dark'>Add to Cart</Button>
                    <div className="reviews">
                        <Ratings rating={product.rating} numReviews={product.numReviews}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
