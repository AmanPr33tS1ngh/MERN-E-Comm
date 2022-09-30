import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './routes/productRoutes.js';
import UserRouter from './routes/userRoutes.js';
import seedRouter from './routes/seedRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cartRouter from './routes/cartRoutes.js';

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to db');
})
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/products',productRouter)
app.use('/api/users',UserRouter)
app.use('/api/orders',orderRouter)
app.use('/api/seed',seedRouter)
app.use('/api/cart',cartRouter)

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(5000,()=>[
    console.log("server runnin")
])