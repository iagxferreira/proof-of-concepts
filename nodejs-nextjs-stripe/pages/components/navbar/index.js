import Button from "../button";
import styles from "../../../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <p>Lorem ipsum</p>
      </div>
      <ul className={styles.list}>
        <li>
          <Link href="#">Relatos de clientes</Link>
        </li>
        <li>
          <Link href="#">Sobre o produto</Link>
        </li>
        <li><Button/></li>
      </ul>
    </div>
  );
}
