import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';




const UpdateUser = () => {
    const navigate=useNavigate();
    const userInfo=JSON.parse(localStorage.getItem('userInfo'))

    const [name,setName]=useState(userInfo.name);
    const [email,setEmail]=useState(userInfo.email);
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const submitHandler=async (e)=>{
        e.preventDefault();
        if(confirmPassword!==password){
            return toast.error('passwords do not match');
        }
        try{
            const data=await axios.put(
                `api/users/profile/${userInfo._id}`,
                {
                    name,email,password
                }
            );
            console.log(data);
            localStorage.setItem('userInfo',JSON.stringify(data.data))
            toast.success('user updated successfully');
            navigate('/');
        }catch(err){
            toast.error(err);
            
        }
    }
    console.log(userInfo._id);
  return (
    <div>
      <title>User Profile</title>
      <h1 className='my-3'>User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e)=>setName(e.target.value)} required/> 
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/> 
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' onChange={(e)=>setPassword(e.target.value)} /> 
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' onChange={(e)=>setConfirmPassword(e.target.value)} /> 
        </Form.Group>
        <div className='mb-3'>
            <Button type='submit'>Update</Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUser
