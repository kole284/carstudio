import { useState } from 'react';
import styles from './Burgermenu.module.scss';

function Burgermenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      {/* Burger ikona - sakrij kad je open */}
      <div 
        className={styles.burgermenu} 
        onClick={toggleMenu} 
        style={{ display: open ? 'none' : 'flex' }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay meni - uvek renderuj */}
      <nav className={`${styles.navbar} ${open ? styles.open : ''}`}>
        {/* Logo na vrhu */}
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>

        <button className={styles.closeButton} onClick={toggleMenu}>×</button>

        <ul>
          <li><a href="#home" onClick={toggleMenu}>Početna</a></li>
          <li><a href="#about" onClick={toggleMenu}>O nama</a></li>
          <li><a href="#services" onClick={toggleMenu}>Usluge</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Kontakt</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Burgermenu;

