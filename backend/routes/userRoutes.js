import express from 'express'
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils.js';

const UserRouter=express.Router();

UserRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            });
            return
        }
    }
    res.status(401).send({message:"invalid email or pass"})
}))

UserRouter.post(
    '/signup',expressAsyncHandler(async (req,res)=>{
        const newUser=new User({ 
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password)
        })
        const user=await newUser.save();
        res.send({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user)
        });
    })
)
UserRouter.put(
    '/profile/:id',expressAsyncHandler(async (req,res)=>{
        const user=await User.findById(req.params.id);
        if(user){
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.body.password){
                user.password=bcrypt.hashSync(req.body.password,)
            }

            const updatedUser=await user.save();

            res.send(
                {
                    _id:updatedUser._id,
                    name:updatedUser.name,
                    email:updatedUser.email,
                    isAdmin:updatedUser.isAdmin,
                }
            )
        }
        else{
            res.status(404).send({message:'User not found'})
        }
    })
)

export default UserRouter;