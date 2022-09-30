import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'

const productRouter = express.Router();

productRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        image: req.body.image,
        description: req.body.description,
        name: req.body.name,
        numReviews: req.body.numReviews,
        price: req.body.price,
        rating: req.body.rating,
        slug: req.body.slug
    });

    const product = await newProduct.save();
    res.status(201).send({ message: 'New ORder created: ', product })
}))

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products)

})

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'product not found' });
    }
})

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'product not found' });
    }
})

productRouter.put(
    '/:id', expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        
        const product = await Product.findById(req.params.id);

        product.name=req.body.name;
        product.slug=req.body.slug;
        product.price=req.body.price;
        product.description=req.body.description;
        product.countInStock=req.body.countInStock;
        product.numReviews=req.body.numReviews;
        product.category=req.body.category;
        product.brand=req.body.brand;
        product.image=req.body.image;
        product.rating=req.body.rating;
            const updatedProduct=await product.save();

            res.status(201).send({ message: ' ORder updated: ', updatedProduct })



    })
)

productRouter.delete(
    '/:id', expressAsyncHandler(
        async (req, res) => {
            const id = req.params.id;
            const product = await Product.findById(id);
            const products = await Product.deleteOne(product);

            res.status(201).send({ message: 'ORder deleted: ', products })
        }
    )
)
export default productRouter;