"use client"

import Image from "next/image";
import styles from "./Navbar.module.css"
import { CategoryContext, CategoryContextType } from "@/contexts/CategoryContext";
import { useContext, useRef, useState } from "react";
import { Button, IconButton, Menu, MenuItem} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { grey } from "@mui/material/colors";
import { Category } from "@/models/Category";

export function Navbar(){

    const {categories, setCategoryActive} = useContext(CategoryContext) as CategoryContextType;

    const [menuOpen, setMenuOpen] = useState(false);

    const selectCategory = (category: Category) => {
      setCategoryActive(category);
      setMenuOpen(false); 
    }

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
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={styles.Navbar__categoryBtn}
                  onClick={() => selectCategory(category)}
                >
                  {category.name}
                </button>
              </li>
            ))}
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