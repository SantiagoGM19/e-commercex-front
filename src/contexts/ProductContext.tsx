"use client"

import { Product } from "@/models/Product";
import { ProductAction } from "@/reducers/products/ProductAction";
import { ProductReducer } from "@/reducers/products/ProductReducer";
import { createContext, Dispatch, useEffect, useReducer } from "react";

export type ProductContextType = {
    products: Product[],
    dispatch: Dispatch<ProductAction> | null
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductContextProvider = ({children}: {children: React.ReactNode}):React.ReactNode =>{
    const [products, dispatch] = useReducer(ProductReducer, []);

    useEffect(() => {
        //fetch to back
        //then.
        //TODO: Connect with back and dispatch data requested
        dispatch({type:"loaded", products: [
              {
                id: 1,
                categoryId: 2,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                image:"/rtx5070.jpg",
                rate: 5
              },
              {
                id: 2,
                categoryId: 2,
                name: "Laptop X300",
                price: 1000,
                description: "Lapton X300 16GB RAM 1TB storage",
                image:"/laptop.jpg",
                rate: 5
              },
              {
                id: 3,
                categoryId: 3,
                name: "Blue armchair",
                price: 1000,
                description: "Blue armchair for living room",
                image: "/armchair.jpg",
                rate: 5
              },
              {
                id: 4,
                categoryId: 4,
                name: "Acoustic guitar",
                price: 1000,
                description: "Acoustic guitar metal strings brown body",
                image:"/guitar.jpg",
                rate: 5
              },
              {
                id: 5,
                categoryId: 5,
                name: "Purple pants",
                price: 1000,
                description: "Purple pants",
                image:"/pants.jpg",
                rate: 5
              },
              {
                id: 6,
                categoryId: 5,
                name: "t-shirts",
                price: 1000,
                description: "5-Group t-shirts for summer",
                image:"/tshirts.jpg",
                rate: 5
              }
            ]});
    },[])

    return(
        <ProductContext.Provider value={{products, dispatch}}>
            {children}
        </ProductContext.Provider>
    );
};