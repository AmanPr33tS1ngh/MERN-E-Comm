import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const Admin = () => {
    const navigate=useNavigate();
    const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await axios.get(`/api/orders/`);
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
      <ListGroup className='py-1'>
        <h1>Product Changes</h1>
        <ListGroup.Item>
          <Row>
          <Col md={3}><Button className='btn btn-dark' onClick={()=>navigate(`/add-order`)}>Add Products</Button></Col>
          <Col md={4}><Button className='btn btn-dark'  onClick={()=>navigate(`/delete-order`)}>Edit/Remove Products</Button> </Col>
          
      </Row>
        </ListGroup.Item>
      </ListGroup>
      <hr />
      <h1 className='py-3'>All Orders</h1>
      {order ? order.map((order) => (

        <Row>

          <ListGroup className='my-3'>
              <ListGroup.Item >
            {order.orderItems.map((item) => (
                <Row className='align-items-center my-1'>
                  <div>
                    <Col md={4} className='my-1'>
                      <Link to={`/product/${item.slug}`}>
                        <img className='mx-5' src={item.image} alt={item.name} />
                      </Link>
                    </Col>
                    <span>{item.name}</span>

                    <span className='mx-5'>Quantity: {item.quantity}</span>
                    <span className='mx-5'>Total Price Paid : {item.totalPrice} </span>
                  </div>
                  
                  <hr />
                </Row>
            ))}
            <div className="align-items-center">
                    <Button onClick={()=>navigate(`/admin/${order._id}`)} className='btn btn-dark'>Check Full Details</Button>
                  </div>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      )) : (<div>No Orders RN...</div>)}
    </div>
  )
}

export default Admin
