import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Ratings from './Ratings';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditDeleteProductScreen = (props) => { 
    const navigate=useNavigate();
    const { product } = props;
    const deleteHandler = (id) => {
        const req=async()=>{
            try{
              const result=await axios.delete(`/api/products/${id}`);
              toast.success('Item deleted Successfully');
      console.log(result);
            }catch(err){
              console.log(err);
            }
          }
          req().then(()=>navigate('/admin'))
    }

    return (
        <div>
            <div>
                <div class="card m-3 shrink" style={{ width: "18rem" }}>
                    <Link to={`/product/${product.slug}`}><img src={product.image} class="card-img-top" alt={product.name} /></Link>
                    <div class="card-body a-style">
                        <Link className='white' to={`/product/${product.slug}`}>
                            <p>{product.name}</p>
                        </Link>
                        <p>
                            <strong>${product.price}</strong>
                        </p>
                        <Button onClick={() => deleteHandler(product._id)} className='btn btn-dark mx-3'>Delete Product</Button>
                        <Button onClick={() => navigate(`/edit-order/${product._id}`)} className='btn btn-dark'>Edit </Button>
                        <div className="reviews">
                            <Ratings rating={product.rating} numReviews={product.numReviews} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDeleteProductScreen
