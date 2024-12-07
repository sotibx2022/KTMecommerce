import axios from "axios"
export const getAllProducts = async() =>{
    const response = await axios.get(`http://localhost:3000/api/products`);
    return response.data.products;
}
export const getSingleProduct= async(productId:string)=>{
    const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
    return response.data.singleProduct;
}