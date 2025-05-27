"use client"

import { Product } from "@/models/Product";
import { ProductAction } from "@/reducers/products/ProductAction";
import { ProductReducer } from "@/reducers/products/ProductReducer";
import { createContext, Dispatch, useEffect, useReducer } from "react";

type ProductContextType = {
    products: Product[],
    dispatchProduct: Dispatch<ProductAction> | null
}

export const ProductContext = createContext<ProductContextType>({
    products: [
              {
                id: 1,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              }
            ],
    dispatchProduct:null
});

export default function ProductContextProvider({children}: {children: React.ReactNode}):React.ReactNode{
    const [products, dispatchProduct] = useReducer(ProductReducer, []);

    useEffect(() => {
        //fetch to back
        //then.
        //TODO: Connect with back and dispatch data requested
        dispatchProduct({type:"loaded", products: [
              {
                id: 1,
                name: "RTX 5070",
                price: 1000,
                description: "Graphic Card RTX 5070 VRAM 12GB",
                rate: 5
              }
            ]});
    },[])

    return(
        <ProductContext.Provider value={{products, dispatchProduct}}>
            {children}
        </ProductContext.Provider>
    );
};