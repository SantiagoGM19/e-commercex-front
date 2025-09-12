"use client";
import React from 'react';
import styles from './StarRating.module.css';

export interface StarRatingProps {
  value: number;              // 0..5
  max?: number;               // default 5
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void; // si no readOnly
  label?: string;             // aria label override
  showValue?: boolean;        // mostrar número (ej: 4.5)
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  size = 'md',
  readOnly = true,
  onChange,
  label,
  showValue = false
}) => {
  const safeValue = clamp(value, 0, max);
  const pct = `${(safeValue / max) * 100}%`;

  const baseLabel = label ?? `Calificación ${safeValue} de ${max}`;

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(clamp(safeValue + 1, 0, max));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(clamp(safeValue - 1, 0, max));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(max);
    }
  };

  const interactiveProps = readOnly
    ? { tabIndex: -1 }
    : { tabIndex: 0, role: 'slider', 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-valuenow': safeValue };

  return (
    <div className={`${styles.wrapper} ${styles[size]} ${readOnly ? styles.readOnly : styles.interactive}`}
         aria-label={baseLabel}
         aria-readonly={readOnly}
         onKeyDown={handleKey}
         {...interactiveProps}
    >
      <div className={styles.base} aria-hidden="true">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i}>☆</span>
        ))}
      </div>
      <div className={styles.fill} style={{ width: pct }} aria-hidden="true">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      {showValue && <span className={styles.valueText}>{safeValue.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
