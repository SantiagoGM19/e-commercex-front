"use client"

import { useContext } from "react";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";

export default function Home() {

  const {products} = useContext(ProductContext) as ProductContextType;

  return (
      <main className={styles.products}>
        <aside className="products__filters">
        </aside>
        <section className={styles['products__main']}>
          {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </section>
      </main>
  );
}
