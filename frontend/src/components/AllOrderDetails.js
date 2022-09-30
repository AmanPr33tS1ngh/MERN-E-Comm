import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

const AllOrderDetails = () => {
  const id = useParams().id;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await axios.get(`/api/orders/${id}`);
        setOrder(data.data);
      } catch (err) {
        console.log(err);
      }

    };
    fetchOrder();
  }, [])
  console.log(order);
  return (
    <div>
      <h1>Preview</h1>
      <ListGroup>
        {order.shippingAddress ? (
          <ListGroup.Item>
            <Row>

              <div>
                <h5>Order From {order.shippingAddress.fullName}</h5>
              </div>
              <h6>
                <Col>
                  Address:  {order.shippingAddress.address} , {order.shippingAddress.postalCode} , {order.shippingAddress.city} , {order.shippingAddress.country}
                </Col></h6>

              <Col >
                  <Card>
                    <Card.Body>
                          <Row>
                            <Col md={5}>Price Paid By Customer:  ${order.totalPrice.toFixed(2)} ({order.paymentMethod})</Col>
                            <Col >(including taxes and shipping charges)</Col>
                          </Row>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
          </ListGroup.Item>

        ) : (<div></div>)}
        {order && order.orderItems ? order.orderItems.map((item) => (
          <ListGroup.Item>
            <Row>
              <Col md={3}>
                <img className='img-large' src={item.image} alt={item.name}></img>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">

                  <ListGroup.Item>
                    <h1>{item.name}</h1>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Price : ${item.totalPrice}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Quantity :  {item.quantity}</ListGroup.Item>

                </ListGroup>
              </Col>
            </Row>
          </ListGroup.Item>
        )) : (<div>loading....</div>)}
      </ListGroup>
    </div>
  )
}

export default AllOrderDetails
