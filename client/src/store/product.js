import {create} from "zustand"
import axios from "axios"

export const useProductStore = create((set)=>({
    products:[],
    setProducts:(products) => set({products}),
    createProduct: async (newProduct) => {
        const {name,image,price} = newProduct
        if(!name || !image || !price){
            return {success:false, message:"Please fill all fields"}
        }
        const res = await axios.post("/api/products",{name,image,price})
        set((state)=>({products:[...state.products, res.data.product]}))
       
        return {success:true, message:res.data.message}
        
    },

    fetchProducts: async () => {
        const res = await axios.get("/api/products")
       set({products:res.data.products})
    },

    deleteProduct: async (id) => {
       const res =  await axios.delete(`/api/products/${id}`)
       if(!res.data.success){
        return {success:false, message:"Product not deleted"}
       }
       set(state=>({products:state.products.filter(product => product._id !== id)}))
       return {success:true, message:res.data.message}
    },

    updateProduct: async (id, updatedProduct) => {
        const {name,image,price} = updatedProduct
        const res = await axios.put(`/api/products/${id}`,{name,image,price})
        if(!res.data.success){
            return {success:false, message:"Product not updated"}
           }
        set(state => ({products:state.products.map((product)=>product._id === id ? res.data.product : product)}))   
        return {success:true, message:"Product updated"}
    }

}))