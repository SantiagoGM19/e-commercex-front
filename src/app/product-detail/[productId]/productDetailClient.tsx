"use client";

import Image from "next/image";
import { useProduct } from '@/hooks/useProduct';
import { StarRating } from '@/components/StarRating';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CategoryContext, CategoryContextType } from '@/contexts/CategoryContext';
import { useContext, useMemo } from 'react';
import styles from './productDetail.module.css';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { product, loading, error } = useProduct(productId);
  const { categories } = useContext(CategoryContext) as CategoryContextType;

  const category = useMemo(() => {
    if (!product) return null;
    return categories.find(c => c.id === product.categoryId) || null;
  }, [product, categories]);

  if (loading) {
    return (
      <article className={styles.detailLayout} aria-busy="true" aria-live="polite">
        <div className={styles.mediaColumn}>
          <div className={styles.imageWrapper + ' ' + styles.skeleton} />
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.skeletonLine} style={{ width: '60%' }} />
          <div className={styles.skeletonLine} style={{ width: '30%', marginTop: '0.5rem' }} />
          <div className={styles.skeletonParagraph} />
          <div className={styles.skeletonPrice} />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%' }}>
            <div className={styles.skeletonButton} />
            <div className={styles.skeletonIcon} />
          </div>
        </div>
      </article>
    );
  }

  if (error || !product) {
    return (
      <section className={styles.emptyState} aria-live="polite">
        <h1>{error === 'Identificador inválido' ? 'ID inválido' : 'Producto no encontrado'}</h1>
        <p>{error ?? 'No pudimos cargar este producto.'}</p>
        <a href="/" className={styles.backLink}>Volver al inicio</a>
      </section>
    );
  }

  return (
    <article className={styles.detailLayout}>
      <div style={{gridColumn: '1 / -1'}}>
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            category ? { label: category.name, href: `/?category=${category.slug}` } : { label: 'Categoría', href: '/' },
            { label: product.name }
          ]}
        />
      </div>
      <div className={styles.mediaColumn}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image || '/camera-icon.png'}
            alt={`Imagen del producto ${product.name}`}
            width={600}
            height={600}
            className={styles.mainImage}
            priority
          />
        </div>
      </div>
      <div className={styles.infoColumn}>
        <header className={styles.headerBlock}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.metaRow}>
            <StarRating value={product.rate} size="lg" readOnly />
            <span className={styles.sku}>ID #{product.id}</span>
          </div>
        </header>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceBlock}>
          <span className={styles.price}>${product.price}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryCta} aria-label="Comprar ahora">Comprar ahora</button>
          <button className={styles.secondaryCta} aria-label="Agregar a favoritos" title="Agregar a favoritos">❤</button>
        </div>
      </div>
    </article>
  );
}
