import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation,Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate=useNavigate()
    const {search}=useLocation();
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl?redirect:'/';
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const cartItems=localStorage.getItem("cartItems");

    const userInfo=JSON.parse(localStorage.getItem('userInfo'));

    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
            const{data}=await axios.post('/api/users/signin',{
                email,password
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate(redirect || '/');
        }catch(err){
             toast.error('invalid email or password')
        }
        if(cartItems===null){
            navigate("/")
        }else{
            navigate('/shipping');
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[navigate,redirect,userInfo])
    
  return (
    <Container className='small-container'>
        <title>Sign In</title>
        <h1 className='my-3'>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <div className='mb-3'>
                <Button type='submit' >Sign In</Button>
            </div>
            <div className='mb-3'>
                New Customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
            </div>
        </Form>
    </Container>
  )
}

export default SignIn
