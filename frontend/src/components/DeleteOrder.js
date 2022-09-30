import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditDeleteProductScreen from './EditDeleteProductScreen';
import LoadingBox from './SpinnerLoading';

const DeleteOrder = () => {
    const [products,setProducts]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/api/products');
                setProducts(result.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [])
    console.log(products);
  return (
    <div>
            <div>
                <main>
                    <h1>All Products</h1>
                    <div className="products">
                        
                        {
                            products?(
                                products.map((product)=>(
                                    <div>
                                        <div key={product.slug}></div>
                                        <EditDeleteProductScreen product={product}/>
                                    </div>
                                ))
                            ):(
                                <div><LoadingBox/></div>
                            )
                        }
                    </div>
                </main >
            </div >
        </div>
  )
}

export default DeleteOrder
