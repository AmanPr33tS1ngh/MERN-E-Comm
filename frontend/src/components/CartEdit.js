import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const CartEdit = () => {
  const navigate=useNavigate()
    const[quantity,setQuantity]=useState(1);
    const increaseQuantity=()=>{
        setQuantity(quantity+1)
    }
    const decreaseQuantity=()=>{
        setQuantity(quantity-1)
    }
    const id=useParams().id;
    const [cartItems,setCartItems]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(`/api/cart/${id}`);
            setCartItems(result.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [])

      console.log(cartItems);
      const totalPrice=quantity*cartItems.price;
      const updateHandler=async()=>{
        const req=async()=>{
          localStorage.setItem('totalPrice',totalPrice)
          try{
            const result=await axios.put(`/api/cart/${id}/${quantity}`,{
              totalPrice:totalPrice
            })
            toast.success('item updated successfully')
          }catch(err){
            toast.error('there was some error while updating')
          }
        }
        req();
        
        navigate('/cart');
      }
      
  return (
    <div>
      <div>
      {cartItems.length==0?(<div></div>):(
        <Row>
        <Col md={6}>
          <img className='img-large' src={cartItems.image} alt={cartItems.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">

            <ListGroup.Item>
              <h1>{cartItems.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              Price : ${cartItems.price}/piece
            </ListGroup.Item>
            <ListGroup.Item>
            Description: <p> {cartItems.description}</p>

            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                <Col md={15}>
            <Button className='btn btn-dark mx-3' onClick={decreaseQuantity} disabled={quantity<=1}>-</Button>
            <Button className='btn btn-dark mx-3' >{quantity}</Button>
            <Button className='btn btn-dark mx-3' disabled={quantity>=cartItems.countInStock} onClick={increaseQuantity}>+</Button>
        </Col></Row>
        <Col md={3}>
            <Button onClick={updateHandler} className='btn btn-dark my-3'>Update</Button></Col>
        </ListGroup.Item>
        

          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
                <Row>
                  <Col>Status:</Col>
                  <Col>{cartItems.countInStock>0?
                  <Badge bg="success">In Stock</Badge>
                  :
                  <Badge bg="danger">Unavailable</Badge>
                  }</Col>
                </Row>
                </ListGroup.Item>

                  
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      )}
    </div>
    </div>
  )
}

export default CartEdit
