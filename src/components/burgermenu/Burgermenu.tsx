import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Burgermenu.module.scss';
import { NAV_LINKS } from '../../constants/routes';

function Burgermenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      {/* Burger ikona */}
      <div
        className={styles.burgermenu}
        onClick={toggleMenu}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Overlay meni */}
      <nav className={`${styles.navbar} ${open ? styles.open : ''}`}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>

        <button className={styles.closeButton} onClick={toggleMenu}>×</button>

        <ul>
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Burgermenu;

