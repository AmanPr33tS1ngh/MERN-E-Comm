import React, { useEffect } from 'react'
import axios from 'axios'
import CheckOutSteps from './CheckOutSteps'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {  Link, useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const PlaceOrder = () => {
  const navigate = useNavigate();


  const cart=JSON.parse(localStorage.getItem('cartItems'))

    const userInfo=JSON.parse(localStorage.getItem('userInfo'))

  const cartItem = localStorage.getItem("paymentMethod")
  useEffect(() => {
    if (!cartItem) {
      navigate("/payment")
    }
  }, [cart, navigate])

  const carts = [];
  carts.push(JSON.parse(localStorage.getItem("cartItems")))
  let cartItems;
  if(carts[0]!=null){
     cartItems = carts[0].map((item) => item)
  }
  let itemsPrice = 0;
  let shippingPrice = 0;
  let taxPrice = 0;
  let totalPrice = 0;
  console.log(cartItems);
  if (cartItems!=undefined) {
    cartItems.map((item) => {
      itemsPrice += item.totalPrice;
      shippingPrice += (item.price / 3);
      taxPrice += (item.price / 30);
      return 0;
    })
  }

  totalPrice = itemsPrice + shippingPrice + taxPrice;
  const paymentMethod = localStorage.getItem("paymentMethod");

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"))
  const placeOrderHandler = async () => {
    try {
      const deleteCart = async () => {
        const result = await axios.delete(`api/cart`);
        console.log(result);
      }

      const items = {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        isDelivered: false,
        isPaid: false,
        user: userInfo,
        userId:userInfo._id
      }
      console.log(items);
      const { data } = await axios.post('api/orders', items)
      toast.success('Order Placed')
      deleteCart();
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`)
    } catch (err) {
      toast.error('there was some error')
    }
  }

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <title>Preview Order</title>

      <h1>Preview Order</h1>

      {cartItems!=null?(<Row className='scroll-down'>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>{shippingAddress.fullName} <br />
                <strong>Address:</strong> {shippingAddress.address},{shippingAddress.city},{shippingAddress.postalCode},{shippingAddress.country}

              </Card.Text>
              <Link className='white' to='/shipping'>Click to here Edit</Link>
            </Card.Body>
          </Card>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Text>
                <strong>Method:</strong>  {paymentMethod}
              </Card.Text>
              <Link className='white' to="/payment">Click to here Edit</Link>
            </Card.Body>
          </Card>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              {cartItems ? cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={3}>
                    <Link className='white' to={`/product/${item.slug}`}>
                      <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbail' />{' '}
                      </Link>
</Col>
<Col className='mx-3'>
<Col>
                      <Link className='white' to={`/product/${item.slug}`}>{item.name}</Link></Col>
                      <Col>
                    <span>Item Quantity: {item.quantity}</span></Col>
                    <Col>
                    <span>Total Price: {item.totalPrice}</span></Col>
                    </Col>
                  </Row>
                  <hr />
                </ListGroup.Item>
              )) : (
                <div>

                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Order Total</strong></Col>
                    <Col>${totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type='button' onClick={placeOrderHandler}
                    disabled={totalPrice === 0}>Place Order</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>):(
        <div></div>
      )}

    </div>
  )
}

export default PlaceOrder
