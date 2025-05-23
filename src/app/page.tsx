import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
      <div className="products">
        <header className="header">
          <nav className="navbar">
            <Image src="./favicon.ico" alt="logo"></Image>
            <div className="navbar__options">
              <button className="navbar__user">
                <Image src="./favicon.ico" alt="user icon"></Image>
              </button>
              <div className="navbar__line"></div>
              <button className="navbar__cart">
                <Image src="./favicon.ico" alt="shopping cart"></Image>
              </button>
            </div>
          </nav>
        </header>
        <aside className="products__filters">
          <h2>Categorias</h2>
          <ul>
            <li>Tech</li>
          </ul>
        </aside>
        <main className="products__main"></main>
      </div>
  );
}
