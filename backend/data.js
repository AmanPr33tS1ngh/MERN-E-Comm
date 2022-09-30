import bcrypt from 'bcryptjs'
const data={

    users:[
        {
            name:'aman',
            email:'amanexample.com',
            password:bcrypt.hashSync('1345'),
            isAdmin:true
        },
        {
            name:'john',
            email:'johnexample.com',
            password:bcrypt.hashSync('1345'),
            isAdmin:false
        },
        {
            name:'simar',
            email:'simar@example.com',
            password:bcrypt.hashSync('1345'),
            isAdmin:false
        },
    ],
    products:[{
        // _id:1,
        // _item:1,
        name:"Nikeshirts",
        slug:"nike-slim-shirt",
        image:"",
        category:"shirts",
        price:34,
        countInStock:15,
        brand:'nike',
        rating:4.5,
        numReviews:9,
        description:"wow"
    },
    {
        // _id:3,
        // _item:3,
        name:"Nikesweatshirt",
        slug:"nike-slim-sweatshirt",
        image:"",
        category:"sweatshirt",
        price:34,
        countInStock:15,
        brand:'nike',
        rating:4.5,
        numReviews:9,
        description:"wow"
    },
    {
        // _id:4,
        // _item:4,
        name:"Nikeshoes",
        slug:"nike-slim-shoes",
        image:"",
        category:"shoes",
        price:34,
        countInStock:15,
        brand:'nike',
        rating:4.5,
        numReviews:9,
        description:"wow"
    },
    {
        // _id:5,
        // _item:5,
        name:"Nikepants",
        slug:"nike-slim-pants",
        image:"",
        category:"pants",
        price:34,
        countInStock:15,
        brand:'nike',
        rating:4.5,
        numReviews:9,
        description:"wow"
    }]
}

export default data;