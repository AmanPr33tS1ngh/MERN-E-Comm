import React, { useEffect, useState } from 'react'
import CheckOutSteps from './CheckOutSteps'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const PaymentMethod = () => {
  const navigate=useNavigate();
    const shippingAddress=JSON.parse(localStorage.getItem('shippingAddress'));
    const [paymentMethodName,setPaymentMethod]=useState('');

    useEffect(()=>{
      if(!shippingAddress){
        navigate('/shipping');
      }
    },[shippingAddress,navigate]);

     const submitHandler=(e)=>{
        e.preventDefault();
        localStorage.setItem('paymentMethod',paymentMethodName);
        navigate('/placeorder')
     }
     
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className='container small-container'>
        <title>Payment method</title>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <div className='mb-3'>
                <Form.Check type='radio' id='Paytm' label='Paytm' value='Paytm' checked={paymentMethodName==='Paytm'} onChange={(e)=>setPaymentMethod(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <Button type='submit'>Continue</Button>
            </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentMethod
