import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import CheckOutSteps from './CheckOutSteps'

const ShippingAddress = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
  const [fullName, setFullName] = useState(shippingAddress ? shippingAddress.fullName : '');
  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : '');
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');
  const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : '');
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : '');
  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      'shippingAddress', JSON.stringify({
        fullName, address, city, postalCode, country
      })
    )
    navigate('/payment');
  }
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [userInfo, navigate])
  return (
    <div>
      <title>Shipping Address</title>
      <CheckOutSteps step1 step2 />
      <h1 className='my-3'>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>Address</Form.Label>
          <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>City</Form.Label>
          <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Label>Country</Form.Label>
          <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required></Form.Control>
        </Form.Group>
        <div className='mb-3'>
          <Button variant='primary' type='submit'>Continue</Button>
        </div>
      </Form>
    </div>
  )
}

export default ShippingAddress
