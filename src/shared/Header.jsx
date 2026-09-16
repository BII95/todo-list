import { useAuth } from '../contexts/AuthContext';
import Logoff from '../features/Logoff';
import Navigation from './Navigation';
import styles from '../styles/Header.module.css';

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <h1>Todo List</h1>
        <Navigation></Navigation>
        {isAuthenticated && <Logoff />}
      </div>
    </div>
  );
}
