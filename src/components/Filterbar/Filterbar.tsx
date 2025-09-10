import styles from './Filterbar.module.css';
import { PriceFilter } from './filters/PriceFilter';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';


export function Filterbar() {

    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

    return(
        <section className={styles.filters}>
            <h3>Filters</h3>
            {isMobile ? (
                <>
                    <IconButton
                        aria-label="Abrir filtros"
                        onClick={() => setDrawerOpen(true)}
                        sx={{marginLeft: 2}}
                    >
                        <span role="img" aria-label="filtros">
                            <svg width="24"
                             height="24" 
                             viewBox="0 0 24 24"
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M7 12H17M10 18H14" 
                                stroke="#333" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"/>
                            </svg>
                        </span>
                    </IconButton>
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                    >
                        <div style={{width: 250, padding: 20}}>
                            <h3>Filtros</h3>
                            <PriceFilter/>
                        </div>
                    </Drawer>
                </>
            ) : (
                <PriceFilter/>
            )}
        </section>
    )
};
