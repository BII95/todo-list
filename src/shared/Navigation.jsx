import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Header.module.css';

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  
  function navLinkStyle({ isActive }) {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
    };
  

  return (
    <nav>
      <ul className={styles.navStyle}>
        <li>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" className={navLinkStyle}>
                {' '}
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkStyle}>
                {' '}
                Profile{' '}
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className={navLinkStyle}>
              {' '}
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
