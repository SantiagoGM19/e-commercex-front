import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext, useState } from "react";
import { grey } from "@mui/material/colors";
import { CategoryContext, CategoryContextType } from "@/contexts/CategoryContext";
import { Category } from "@/models/Category";

export function CategoriesFilter(){

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {categories, setCategoryActive} = useContext(CategoryContext) as CategoryContextType;

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const selectCategory = (category: Category) => {
        setCategoryActive(category);
    }

    return(
        <div>
            <Button 
            id="categories-filter"
            variant="text"
            endIcon= {<KeyboardArrowDownIcon />}
            onMouseEnter={handleOpen}
            sx={{width: 100, color: grey[900]}}
            >
                categories
            </Button>
            <Menu
            id="categories-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'categories-filter'
                }
            }}
            >
                {
                    categories.map(category => 
                        <MenuItem key={category.id} onClick={() => {
                            selectCategory(category);
                            handleClose();
                        }}>
                            {category.name}
                        </MenuItem>
                    )
                }
            </Menu>
        </div>
    )
}