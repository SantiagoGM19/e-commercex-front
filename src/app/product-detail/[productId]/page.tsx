'use client'

import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { Product } from "@/models/Product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react"


interface ProductDetailsProps{
    params: Promise<{productId:string}>
}

export default function ProductDetails({params}: ProductDetailsProps){

    const {products} = useContext(ProductContext) as ProductContextType;
    const {productId} = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const productFound = products.find(product => product.id.toString() === productId);
        if(!productFound) router.push('/404');
        else setProduct(productFound)
    },[])

    return(
        <article>
            <main>
                <Image
                 src={product?.image ?? "/camera-icon.png"}
                 alt={product?.name ?? "nothing"}
                 width={500}
                 height={500}/>
                 <p>{product?.description}</p>
            </main>
            <aside>
                <section>
                    <h1>{product?.name}</h1>
                    <p>{product?.rate}</p>
                    <p>{product?.price}</p>
                </section>
                <button>
                    COMPRAR AHORA!
                </button>
            </aside>
        </article>
    )
}