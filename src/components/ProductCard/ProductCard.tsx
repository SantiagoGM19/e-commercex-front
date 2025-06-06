"use client"

import { Product } from "@/models/Product";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { useState } from "react";
import { red } from "@mui/material/colors";

export default function ProductCard({product}: {product: Product}) {

    const [isLike, setIsLike] = useState(false);

    const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLike(!isLike);
    }

    return(
        <Link href={"/"} className={styles.product}>
            <article>
                <IconButton className={styles.likeIcon}
                onClick={(e) => handleLike(e)}
                sx={{color: isLike ? "red" : "inherit"}}
                >
                    {isLike ? <FavoriteIcon/> : <FavoriteBorderIcon/>} 
                </IconButton>
                <Image 
                className={styles["product__image"]}
                src="/rtx5070.jpg" 
                alt="rtx 5070"
                width={250} 
                height={250}/>
                <hr />
                <div className={styles["product__details"]}>
                    <p className={styles["product__description"]}>{product.description}</p>
                    <h2>${product.price}</h2> 
                    <p className="">{product.rate}⭐</p>
                </div>
            </article>
        </Link>
    )
};
