import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const navigate=useNavigate();
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();
        
        try {
            const data  = await axios.post('/api/products', {
                name:String(name),
                slug:String(slug),
                brand:String(brand),
                image:String(image),
                category:String(category),
                description:String(description),
                price:Number(price),
                countInStock:Number(countInStock),
                rating:Number(rating),
                numReviews:Number(numReviews),
            })
            console.log(data);
            toast.success('product added')
            navigate('/admin')
        } catch (err) {
            return toast.error('there was some error while adding product');
        }
    }

    return (
        <div>
            <title>Add Order</title>
            <h1 className='my-3'>Add Order</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='fullName'>
                    <Form.Label>Name of product</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='slug'>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='count'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='reviews'>
                    <Form.Label>Number of Reviews</Form.Label>
                    <Form.Control
                        value={numReviews}
                        onChange={(e) => setNumReviews(e.target.value)}
                        required></Form.Control>
                </Form.Group>

                <div className='mb-3'>
                    <Button variant='primary' type='submit'>Continue</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddOrder
