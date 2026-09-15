// src/shared/Spinner.jsx
import styles from '../styles/Spinner.module.css';

export default function Spinner({ label }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
