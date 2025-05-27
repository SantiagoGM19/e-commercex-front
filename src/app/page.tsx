"use client"

import Image from "next/image";
import { useContext, useEffect, useReducer } from "react";
import { CategoryReducer } from "@/reducers/category/CategoryReducer";
import { ProductContext } from "@/contexts/ProductContext";
import ProductCard from "@/components/ProductCard";

export default function Home() {

  const [categories, dispatchCategory] = useReducer(CategoryReducer, [])
  const {products} = useContext(ProductContext);

  useEffect(() => {
    //fetch to back
    //then.
    //TODO: Connect with back and dispatch data requested
    dispatchCategory({type:"loaded", categories: [{id: 1, name: "Tech"}]})
  }, [])

  return (
      <div className="products">
        <header className="header">
          <nav className="navbar">
            <Image src="" alt="logo" width={100} height={100}></Image>
            <div className="navbar__options">
              <button className="navbar__user">
                <Image src="" alt="user icon"></Image>
              </button>
              <div className="navbar__line"></div>
              <button className="navbar__cart">
                <Image src="" alt="shopping cart"></Image>
              </button>
            </div>
          </nav>
        </header>
        <aside className="products__filters">
          <h2>Categorias</h2>
          <ul>
            {categories.map(category => 
              <li key={category.id}>{category.name}</li>
            )}
          </ul>
        </aside>
        <main className="products__main">
          {products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)}
        </main>
      </div>
  );
}
