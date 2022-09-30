import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const OrderHistory = () => {
  const [order, setOrder] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await axios.get(`/api/orders/user/${id}`);
        setOrder(data.data.order);
      } catch (err) {
        console.log(err);
      }

    };
    fetchOrder();
  }, [])
  console.log(order);

  return (
    <div>
      <h1>Order History</h1>
      {order ? order.map((order) => (

        <Row>

          <ListGroup>
            {order.orderItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className='align-items-center '>
                  <div>
                    <Col className='my-3 custom-grid '>
                      <Link to={`/product/${item.slug}`}>
                        <img className='img-fluid rounded img-thumbnail mx-2' src={item.image} alt={item.name} /></Link>
                    <span className='mx-2'>{item.name}</span>

                    <span className='mx-2'>Quantity: {item.quantity}</span>
                    <span className='mx-2'>Total Price Paid : {item.totalPrice} </span>
                    </Col>
                  </div>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      )) : (<div>No Orders RN...  Go Shop</div>)}
    </div>
  )
}

export default OrderHistory
