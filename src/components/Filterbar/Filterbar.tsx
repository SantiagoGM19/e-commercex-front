import { Button, FormControl, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './Filterbar.module.css';
import { useState } from "react";

export function Filterbar() {

    const [maxValue, setMaxValue] = useState("");
    const [minValue, setMinValue] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    const open = Boolean(anchorEl);

    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const clean = validateIfNotNumberPresent(input);
        setMaxValue(clean);
    }

    const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const clean = validateIfNotNumberPresent(input);
        setMinValue(clean);
    }

    const validateIfNotNumberPresent = (input: string): string => {
        const clean = input.replace(/[^0-9.]/g, "");
        if ((clean.match(/\./g) || []).length > 1) return "";
        return clean;
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleOpenPriceFilter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    return(
        <section className={styles.filters}>
            <h1>Filters</h1>
            <Button
            id="filter-price"
            variant="text"
            endIcon={<KeyboardArrowDownIcon />}
            onMouseEnter={handleOpenPriceFilter}
            >
                price
            </Button>
            <Menu
            id="filters-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'filter-price'
                }
            }}
            >
                <MenuItem>
                    <div className={styles.price}>
                        <FormControl sx={{mr:1}}>
                            <InputLabel htmlFor="adornment-min">Min</InputLabel>
                            <OutlinedInput
                            className={styles.priceInput}
                            id="adornment-min"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="min"
                            onChange={handleMinValueChange}
                            value={minValue}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="adornment-max">Max</InputLabel>
                            <OutlinedInput 
                            className={styles.priceInput}
                            id="adornment-max"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="max"
                            onChange={handleMaxValueChange}
                            value={maxValue}
                            />
                        </FormControl>
                    </div>
                </MenuItem>
            </Menu>
        </section>
    )
};
