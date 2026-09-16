import { Link } from 'react-router';
import styles from '../styles/NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          <span className={styles.errorCode}>Error 404 — </span>
          Page <span className={styles.accentText}>not found.</span>
        </h1>
        <p className={styles.subtext}>
          Sorry, the page you're looking for does not exist.
        </p>

        <ul className={styles.linkList}>
          <li>
            <Link to="/" className={styles.link}>
              Go home
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.link}>
              Back to login
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.link}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
