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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    const selectCategory = (category: Category) => {
      setCategoryActive(category);
    }
    
    return(
        <nav className={styles.Navbar}>
          <Image 
          className={styles['Navbar__logoImage']}
          src="next.svg" 
          alt="logo"
          width={100}
          height={100}/>
          <div className={styles['Navbar__options']}>
            <IconButton>
              <AccountCircleOutlinedIcon sx={{color: grey[900], fontSize: 30}}>
              </AccountCircleOutlinedIcon>
            </IconButton>
            <IconButton >
              <ShoppingCartOutlinedIcon sx={{color: grey[900], fontSize: 30}}>
              </ShoppingCartOutlinedIcon>
            </IconButton>
          </div>
        </nav>
    )
}