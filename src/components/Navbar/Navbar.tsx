'use-client'

import Image from "next/image";
import styles from "./Navbar.module.css"

export default function Navbar(){
    
    return(
        <nav className={styles.Navbar}>
          <Image 
          className={styles['Navbar__logoImage']}
          src="next.svg" 
          alt="logo"
          width={100}
          height={100}/>
          <div className={styles['Navbar__options']}>
            <button className={styles['options__btn']}>
              <Image 
              src="file.svg"
              alt="user icon" 
              width={20}
              height={20}/>
            </button>
            <button className={styles['options__btn']}>
              <Image 
              src="window.svg" 
              alt="shopping cart"
              width={20}
              height={20}/>
            </button>
          </div>
        </nav>
    )
}