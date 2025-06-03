import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="./logo.png" alt="Logo" />
      </div>
      <ul className={styles.navList}>
        <li><a href="#home">Home</a></li>
        <li><a href="#onama">O nama</a></li>
        <li><a href="#usluge">Usluge</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

