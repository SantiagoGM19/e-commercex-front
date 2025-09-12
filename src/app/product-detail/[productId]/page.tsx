import ProductDetailClient from "./productDetailClient";

export default function ProductDetailsPage({ params }: { params: { productId: string } }) {
    return <ProductDetailClient productId={params.productId} />;
}