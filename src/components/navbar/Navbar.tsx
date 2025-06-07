import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { NAV_LINKS } from '../../constants/routes';

type Props = {
  hidden: boolean;
};

function Navbar({ hidden }: Props) {
  return (
    <nav className={`${styles.navbar} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <ul className={styles.navList}>
        {NAV_LINKS.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

