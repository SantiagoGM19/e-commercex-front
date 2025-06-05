"use client"

import { Product } from "@/models/Product";
import Image from "next/image";
import styles from "./ProductCard.module.css";

export default function ProductCard({product}: {product: Product}) {

    return(
        <article className={styles.product}>
            <Image src="/rtx5070.jpg" alt="rtx 5070" width={200} height={200}/>
            <hr />
            <h5>{product.description}</h5>
            <h2>${product.price}</h2>
            <p>{product.rate}⭐</p>
        </article>
    )
};
