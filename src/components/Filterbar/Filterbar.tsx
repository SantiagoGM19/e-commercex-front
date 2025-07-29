import styles from './Filterbar.module.css';
import { CategoriesFilter } from './filters/CategoriesFilter';
import { PriceFilter } from './filters/PriceFilter';


export function Filterbar() {

    

    return(
        <section className={styles.filters}>
            <h3>Filters</h3>
            <PriceFilter/>
            <CategoriesFilter/>
        </section>
    )
};
