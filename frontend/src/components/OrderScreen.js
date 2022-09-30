import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import paytm from '../paytm.png'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const OrderScreen = () => {
    const [modal, setModal] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const { id: orderId } = useParams();
    const navigate = useNavigate()

    const [loading,setLoading]=useState(false);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const data = await axios.get(`/api/orders/${orderId}`);
                setOrder(data.data);
                setLoading(false);
            } catch (err) {
                toast.error('there was some error')
            }

        }
        fetchOrder();
    }, [])

    const modalHandler = () => {
        setModal(true);
    }
    const closeModalHandler = () => {
        setModal(false);
    }

    const paymentHandler = async () => {
        
        const deleteReq = async () => {
            try {
                const result = await axios.delete(`/api/cart`);
                console.log(result);
            } catch (err) {
                toast.error('there was some error')
            }
        }
        const updateReq = async () => {
            try {
                const result = await axios.put(`/api/orders/${orderId}`);
                console.log(result);
            } catch (err) {
                toast.error('there was some error')
            }
        }
        deleteReq();
        updateReq();

        navigate(`/order-history/${userInfo._id}`);
    }
    return (
        <div>
            {order?(<div>
                <title>Order {orderId}</title>
                <h1 className='order-font'>Order {orderId}</h1>
                <Row className='scroll-down'>
                    <Col md={8}>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Shipping</Card.Title>
                                {order.shippingAddress?(<Card.Text>
                                    <div><strong>Name:</strong>{order.shippingAddress.fullName}</div>

                                    <div><strong>Address:</strong>{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}</div>
                                </Card.Text>):(<div></div>)}
                                {order.isDelivered ? (
                                    <Alert variant='primary'>                             Delivered
                                    </Alert>
                                ) : (
                                    <Alert variant='danger'>Not Delivered</Alert>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <div><strong>Method:</strong>{order.paymentMethod}</div>
                                </Card.Text>
                                {order.isPaid ? (
                                    <Alert variant='primary'>                             Paid
                                    </Alert>
                                ) : (
                                    <Alert variant='danger'>Not Paid</Alert>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                                <ListGroup variant='flush'>
                                    {order.orderItems ? order.orderItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className='align-items-center'>
                                                <Col md={6}>
                                                <Link className='white' to={`/product/${item.slug}`}>
                                                    <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail' /></Link>{' '}
                                                    <Link className='white' to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3}><span>
                                                    Quantity:{item.quantity}</span></Col>
                                                <Col md={3}><span>
                                                    Total Price:{item.totalPrice}</span></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )) : (<div>loading...</div>)}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Order Summary</Card.Title>
                                {order.itemsPrice?(
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item> 
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item> 
                                     <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Order Total</Col>
                                            <Col>${order.totalPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <Button onClick={modalHandler} className='btn btn-primary px-5'>
                                                    <img className='paytm' src={paytm} alt="paytm" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>):(<div></div>)}
                            </Card.Body>
                        </Card>
                        {modal ? (<div className='modal'>
                            <div className="mContainer">
                                <Button className='btn btn-dark' onClick={closeModalHandler}>x</Button>
                                <div className="rItem">
                                    <Card className='mb-3 px-5'>
                                        <Card.Body>
                                            <Card.Title>Pay ${order.totalPrice.toFixed(2)}</Card.Title>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Button className='btn btn-dark' onClick={paymentHandler}>Pay Now</Button>
                                                    </Row>
                                                </ListGroup.Item>

                                            </ListGroup>
                                        </Card.Body>
                                    </Card></div>
                            </div>
                        </div>) : (<div></div>)}
                    </Col>
                </Row>
            </div>):(<div>loading</div>)}
            </div>
    )
}

export default OrderScreen
