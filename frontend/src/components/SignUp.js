import React, {  useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPass,setConfirmPass]=useState('')

    const userInfo=JSON.parse(localStorage.getItem('userInfo'));

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(password!==confirmPass){
            toast.error('Passwords do no match');
            return;
        }
        try{
            const{data}=await axios.post('/api/users/signup',{
                name,email,password
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
            navigate('/');
        }catch(err){
            return toast.error('Same user with email exists');
        }
        navigate('/');
    }

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo])
    
  return (
    <Container className='small-container'>
        <title>Sign Up</title>
        <h1 className='my-3'>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' required onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' required onChange={(e)=>setConfirmPass(e.target.value)}/>
            </Form.Group>
            <div className='mb-3'>
                <Button type='submit' >Sign Up</Button>
            </div>
            <div className='mb-3'>
                Already have an account?{' '}
                <Link to={`/signin`}>Sign In</Link>
            </div>
        </Form>
    </Container>
  )
}

export default SignUp
