"use client";
import { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '@/models/Product';
import { ProductContext, ProductContextType } from '@/contexts/ProductContext';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

// Futuro: permitir fetch externo si no está en cache (contexto)
export function useProduct(productId: string | number | undefined): UseProductResult {
  const { products } = useContext(ProductContext) as ProductContextType;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedId = useMemo(() => {
    if (productId === undefined || productId === null) return null;
    const n = Number(productId);
    return Number.isNaN(n) ? null : n;
  }, [productId]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (normalizedId === null) {
      setProduct(null);
      setError('Identificador inválido');
      setLoading(false);
      return;
    }

    // Simular latencia ligera para mostrar skeleton (fácil de quitar luego)
    const timer = setTimeout(() => {
      const found = products.find(p => p.id === normalizedId) || null;
      if (!found) {
        setError('Producto no encontrado');
      }
      setProduct(found);
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [normalizedId, products]);

  return { product, loading, error };
}
