"use client"

import Image from "next/image";
import styles from "./Navbar.module.css"
import { CategoryContext, CategoryContextType } from "@/contexts/CategoryContext";
import { useContext, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { grey } from "@mui/material/colors";
import { Category } from "@/models/Category";

export function Navbar(){

  const {categories, setCategoryActive, categoryActive} = useContext(CategoryContext) as CategoryContextType;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

    const [menuOpen, setMenuOpen] = useState(false);

    const selectCategory = useCallback((category: Category) => {
      if (!category) return;
      const currentSlug = searchParams.get('category');
      const nextSlug = category.slug === 'all' ? null : category.slug;

      if ((currentSlug === nextSlug) || (currentSlug === null && nextSlug === null && categoryActive.slug === 'all')) {
        if (categoryActive.id !== category.id) setCategoryActive(category);
        setMenuOpen(false);
        return;
      }

      setCategoryActive(category);
      setMenuOpen(false);

      const params = new URLSearchParams(searchParams?.toString() ?? '');
      if (nextSlug === null) {
        params.delete('category');
      } else {
        params.set('category', nextSlug);
      }
      const qs = params.toString();

      const targetUrl = qs ? `/?${qs}` : '/';
      if (pathname === '/') {
        router.replace(targetUrl);
      } else {
        router.push(targetUrl);
      }
    }, [pathname, router, searchParams, setCategoryActive, categoryActive]);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

    return(
        <nav className={styles.Navbar}>
          <Image 
            className={styles.Navbar__logoImage}
            src="next.svg" 
            alt="logo"
            width={60}
            height={60}
          />
          {isMobile && (
            <button
              className={styles.Navbar__burger}
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={styles.Navbar__burgerBar}></span>
              <span className={styles.Navbar__burgerBar}></span>
              <span className={styles.Navbar__burgerBar}></span>
            </button>
          )}
          <ul
            className={styles.Navbar__categories}
            style={isMobile ? {display: menuOpen ? 'flex' : 'none'} : {}}
          >
            {categories.map((category) => {
              const isActive = categoryActive && categoryActive.id === category.id;
              return (
                <li key={category.id}>
                  <button
                    className={styles.Navbar__categoryBtn}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => selectCategory(category)}
                    style={isActive ? { fontWeight: 600, textDecoration: 'underline' } : undefined}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.Navbar__options}>
            <IconButton className={styles.Navbar__iconBtn}>
              <AccountCircleOutlinedIcon sx={{color: grey[900], fontSize: 30}} />
            </IconButton>
            <IconButton className={styles.Navbar__iconBtn}>
              <ShoppingCartOutlinedIcon sx={{color: grey[900], fontSize: 30}} />
            </IconButton>
          </div>
        </nav>
    )
}