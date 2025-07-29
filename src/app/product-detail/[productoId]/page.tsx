'use client'

import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react"


interface ProductDetailsProps{
    params: {
        productId: string
    }
}

export default function ProductDetails({params}: ProductDetailsProps){

    const {products} = useContext(ProductContext) as ProductContextType;
    const router = useRouter();

    useEffect(() => {
        const productFound = products.filter(product => product.id.toString() === params.productId).length;
        if(productFound !== 1){
            router.push('/404')
        }
    },[])

    return(
        <div>
            Product details!!
        </div>
    )
}