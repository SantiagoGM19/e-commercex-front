"use client"

import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import {ProductCard} from "@/components/ProductCard";
import styles from "./page.module.css";
import { CategoryContext, CategoryContextType } from "@/contexts/CategoryContext";
import { Product } from "@/models/Product";
import { Filterbar } from "@/components/Filterbar";

export default function Home() {

  const {products} = useContext(ProductContext) as ProductContextType;
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const {categoryActive} = useContext(CategoryContext) as CategoryContextType;

  useEffect(() => {
    if(categoryActive.id !== 1){
      setProductsToShow(products.filter(product => product.categoryId === categoryActive.id ));
    }else{
      setProductsToShow(products);
    }
  }, [categoryActive])

  return (
      <main className={styles.products}>
        <header className="products__filters">
          <Filterbar/>
        </header>
        <section className={styles['products__main']}>
          {productsToShow.map(product => <ProductCard key={product.id} product={product}/>)}
        </section>
      </main>
  );
}
