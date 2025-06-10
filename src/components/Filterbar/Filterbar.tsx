

import { FormControl, Input, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import styles from './Filterbar.module.css';
import { useState } from "react";

export function Filterbar() {

     const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const clean = input.replace(/[^0-9.]/g, "");
        if ((clean.match(/\./g) || []).length > 1) return;
        setValue(clean);
    };

    return(
        <section className={styles.filters}>
            <h1>Filters</h1>
            <div className={styles.price}>
                <FormControl sx={{mr:1}}>
                    <InputLabel htmlFor="adornment-min">min</InputLabel>
                    <OutlinedInput
                    className={styles.priceInput}
                    id="adornment-min"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="min"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="adornment-max">max</InputLabel>
                    <OutlinedInput 
                    className={styles.priceInput}
                    id="adornment-max"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="max"
                    onChange={handleChange}
                    value={value}
                    />
                </FormControl>
            </div>
        </section>
    )
};
