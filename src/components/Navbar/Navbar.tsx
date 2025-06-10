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
    const currentlyHovering = useRef(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      currentlyHovering.current = true;
      setAnchorEl(event.currentTarget);
    }

    const handleHover = () => {
      currentlyHovering.current = true;
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
          <ul>
            {
            categories.slice(0,4).map(category =>
            <li key={category.id}>
              <Button key={category.id}
               sx={{color: grey[900]}}
               onClick={() => selectCategory(category)} >
                {category.name}
              </Button>
            </li>
            )
            }
            <li
            >
              <Button
              id="option-more"
              variant="outlined"
              sx={{color: grey[900], borderColor: grey[900]}}
              aria-controls={open ? 'categories-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onMouseEnter={handleClick}
              >
                More
              </Button>
              <Menu
              id="categories-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  onMouseEnter: handleHover,
                  'aria-labelledby': 'option-more'
                }
              }}
              >
                {categories.slice(4).map(category => 
                <MenuItem key={category.id} onClick={() => {
                  selectCategory(category);
                  handleClose();
                  }}>
                  {category.name}
                </MenuItem>)
                }
              </Menu>
            </li>
          </ul>
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