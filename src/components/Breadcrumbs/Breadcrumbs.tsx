"use client";
import React from 'react';
import styles from './Breadcrumbs.module.css';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
  hideCurrent?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',  
  className,
  hideCurrent = false
}) => {
  if (!items || items.length === 0) return null;

  const visibleItems = hideCurrent ? items.slice(0, -1) : items;

  return (
    <nav aria-label="Breadcrumb" className={[styles.breadcrumbs, className].filter(Boolean).join(' ')}
         itemScope itemType="https://schema.org/BreadcrumbList">
      <ol className={styles.list}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          return (
            <li key={index}
                className={styles.item}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem">
              {item.href && !isLast ? (
                <Link href={item.href} itemProp="item" className={styles.link}>
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span itemProp="name" aria-current={isLast ? 'page' : undefined} className={styles.current}>{item.label}</span>
              )}
              <meta itemProp="position" content={(index + 1).toString()} />
              {!isLast && <span className={styles.separator} aria-hidden="true">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
