import axios from 'axios';
import React, {  useEffect,  useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Ratings from './Ratings';
import LoadingBox from './SpinnerLoading';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const ProductScreen = () => {
  const params=useParams();
  const {slug}=params;
  const navigate=useNavigate()
const [loading,setLoading]=useState(false);
const[product,setProducts]=useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/products/slug/${slug}`);
      setProducts(result.data);
      setLoading(false);
    } catch (err) {
      toast.error('there was some error')  
}
    
  };
  fetchData();
}, [slug])
console.log(product);

// const user=JSON.parse(localStorage.getItem("userInfo"));

const notify=()=>{
  toast(' Item added to Cart  ',{position:toast.POSITION.TOP_CENTER});
}

const addToCartHandle=async()=>{
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
        totalPrice:product.price,
  };
  const data=await axios.post(`/api/cart/`,cartProduct);
  notify();
  navigate('/');
}
  return (
    loading?(
      <LoadingBox/>
  ):(
    <div>
      <Row>
        <Col md={6}>
          <img className='img-large' src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Ratings rating={product.rating} numReviews={product.numReviews}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price : ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
            Description: <p> {product.description}</p>

            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock>0?
                  <Badge bg="success">In Stock</Badge>
                  :
                  <Badge bg="danger">Unavailable</Badge>
                  }</Col>
                </Row>
                </ListGroup.Item>

                {product.countInStock>0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                    <button type="button" onClick={addToCartHandle} class="btn btn-dark">Add to cart</button>

                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>)
  )
}

export default ProductScreen
