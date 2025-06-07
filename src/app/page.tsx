"use client"

import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";
import { CategoryContext, CategoryContextType } from "@/contexts/CategoryContext";
import { Product } from "@/models/Product";
import { log } from "console";

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
        <aside className="products__filters">
        </aside>
        <section className={styles['products__main']}>
          {productsToShow.map(product => <ProductCard key={product.id} product={product}/>)}
        </section>
      </main>
  );
}
