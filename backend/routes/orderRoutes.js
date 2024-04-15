import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken, isAuth } from '../utils.js';
import Order from '../models/orderModel.js';

const orderRouter=express.Router();

orderRouter.post('/',expressAsyncHandler(async(req,res)=>{
    const newOrder=new Order({
        orderItems:req.body.orderItems,
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.shippingPrice,
        taxPrice:req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        isDelivered:req.body.isDelivered,
        isPaid:req.body.isPaid,
        user:req.body.user,
        userId:req.body.userId
    });

    const order=await newOrder.save();
    res.status(201).send({message:'New ORder created: ',order})
}))

orderRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    console.log(req.params.id);
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({message:'Order Not Found'})
    }
}))

orderRouter.put(
    '/:id',expressAsyncHandler(async (req,res)=>{
        const id=req.params.id;        
        const order=await Order.findById(id);
        
        order.isPaid=true;
        
        const updated=await order.save();

        res.status(201).send({message:' ORder updated: ',updated})
    })
)

orderRouter.get('/user/:userid',expressAsyncHandler(async(req,res)=>{
    const userId=req.params.userid;

    const order=await Order.find({userId});
    
    res.status(201).send({message:' orders of user : ',order})
}))

orderRouter.get('/',expressAsyncHandler(async(req,res)=>{

    const order=await Order.find({isPaid:true});
    console.log(order);
    
    res.status(201).send({message:' orders of user : ',order})
}))

export default orderRouter;