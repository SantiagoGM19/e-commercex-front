"use client"

import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import {ProductCard} from "@/components/ProductCard";
import styles from "./page.module.css";
import { CategoryContext, CategoryContextType } from "@/contexts/CategoryContext";
import { Product } from "@/models/Product";
import { Filterbar } from "@/components/Filterbar";

import { useSearchParams, useRouter } from 'next/navigation';

export default function Home() {

  const {products} = useContext(ProductContext) as ProductContextType;
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const {categoryActive, categories, setCategoryActive} = useContext(CategoryContext) as CategoryContextType;
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if(categoryActive && categoryActive.slug !== 'all'){
      setProductsToShow(products.filter(product => product.categoryId === categoryActive.id));
    } else {
      setProductsToShow(products);
    }
  }, [categoryActive, products]);

  useEffect(() => {
    const catSlug = searchParams.get('category');
    if (!catSlug) {
      if (categoryActive.slug !== 'all') {
        const allCat = categories.find(c => c.slug === 'all');
        if (allCat) setCategoryActive(allCat);
      }
      return;
    }
    if (catSlug === categoryActive.slug) return;
    const match = categories.find(c => c.slug === catSlug);
    if (match) {
      setCategoryActive(match);
    }
  }, [searchParams, categories, setCategoryActive]);

  useEffect(() => {
    if (categoryActive?.slug === 'all' && searchParams.get('category') === 'all') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('category');
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : '/');
    }
  }, [categoryActive, searchParams, router]);

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
