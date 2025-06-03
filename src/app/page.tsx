"use client"

import { useContext, useEffect, useReducer } from "react";
import { CategoryReducer } from "@/reducers/category/CategoryReducer";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function Home() {

  const [categories, dispatchCategory] = useReducer(CategoryReducer, [])
  const {products} = useContext(ProductContext) as ProductContextType;

  useEffect(() => {
    //fetch to back
    //then.
    //TODO: Connect with back and dispatch data requested
    dispatchCategory({type:"loaded", categories: [{id: 1, name: "Tech"}]})
  }, [])

  return (
      <div className="products">
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
