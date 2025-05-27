import { Product } from "@/models/Product";

export default function ProductCard({product}: {product: Product}) {

    return(
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>{product.rate}⭐</p>
        </div>
    )
};
