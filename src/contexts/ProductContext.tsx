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
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              },
              {
                id: 2,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              },
              {
                id: 3,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              },
              {
                id: 4,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              },
              {
                id: 5,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              },
              {
                id: 6,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
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