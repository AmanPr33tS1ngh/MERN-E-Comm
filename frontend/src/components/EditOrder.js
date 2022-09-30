import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditOrder = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`/api/products/${id}`);
                setProduct(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    const [name, setName] = useState(product?product.name:'');
    const [slug, setSlug] = useState(product?product.slug:'');
    const [image, setImage] = useState(product?product.image:'');
    const [brand, setBrand] = useState(product?product.brand:'');
    const [category, setCategory] = useState(product?product.category:'');
    const [price, setPrice] = useState(product?product.price:'');
    const [description, setDescription] = useState(product?product.description:'');
    const [countInStock, setCountInStock] = useState(product?product.countInStock:'');
    const [rating, setRating] = useState(product?product.rating:'');
    const [numReviews, setNumReviews] = useState(product?product.numReviews:'');
    const submitHandler = (e) => {
        e.preventDefault();
            const req=async()=>{
              try{
                const result=await axios.put(`/api/products/${id}`,{
                    name:String(name),
                    slug:String(slug),
                    description:String(description),
                    rating:Number(rating),
                    numReviews:Number(numReviews),
                    image:String(image),
                    brand:String(brand),
                    category:String(category),
                    countInStock:Number(countInStock),
                    price:Number(price),
                })
                toast.success('Product updated successfully')
                navigate('/delete-order')
              }catch(err){
                toast.error('there was some error while updating product')
              }
            }
            req();
            
    }
    return (
        <div>
            <title>Edit Order</title>
            <h1 className='my-3'>Edit Order</h1>

            {product?(<Form onSubmit={submitHandler}>
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
            </Form>):(<div></div>)}
        </div>
    )
}

export default EditOrder
