import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/cart');
        setCartItems(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [])
  const cart = cartItems.map((item) => item);
  console.log(cart);

  let subtotal_price = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal_price += cartItems[i].totalPrice;
  }

  const totalPrice=localStorage.getItem('totalPrice');
  console.log(totalPrice);

  const checkoutHandler = () => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    navigate('/shipping');
  }
  const deleteHandler=(id)=>{
    console.log(id);
    const req=async()=>{
      try{
        const result=await axios.delete(`/api/cart/${id}`);
        toast.success('item deleted successfully')
console.log(result);
      }catch(err){
        toast.error('there was some erro while deleting')
      }
    }
    req().then(navigate('/').then(navigate('/cart')))
    
  }
  return (
    <div>
      <title>Shopping Cart</title>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div>
              <h1>Cart is empty</h1>
              <Link className='white' to={"/"}> Click here to Go Shopping</Link>
            </div>
          ) :
            (
              <ListGroup>
                <h1>Cart</h1>
                {cartItems ? cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img className='img-fluid rounded img-thumbnail' src={item.image} alt={item.name} />{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>

                      <Col md={2}>${item.totalPrice}</Col>
                      <Col md={6}>
                        <Button onClick={() => navigate(`/cart/edit/${item._id}`)} className='btn btn-dark mx-1'>{' '}+{' '} </Button>
                        <Button onClick={() => navigate(`/cart/edit/${item._id}`)} className='btn btn-dark mx-1'> {' '}  - {' '} </Button>
                        <Button onClick={()=>{deleteHandler(item._id)}} className='btn btn-dark mx-1'>Delete</Button>
                      </Col>

                    </Row>
                  </ListGroup.Item>
                )) : (<div>cart is empty</div>)}
              </ListGroup>
            )
          }
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal:
                    ({cartItems.length}{" "}items) : $ {subtotal_price}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <button type="button" disabled={cartItems.length === 0} onClick={checkoutHandler} class="btn btn-dark">Proceed to Checkout</button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cart
