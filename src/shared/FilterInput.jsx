import styles from '../styles/FilterInput.module.css'
import { MAX_LENGTHS } from '../utils/todoValidation';
export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <>
      <div>
        <label htmlFor="filterInput" className={styles.label}>Search todos:</label>
        <input
          className={styles.input}
          id="filterInput"
          type="text"
          value={filterTerm}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search by title..."
          maxLength={MAX_LENGTHS.filter}
        ></input>
      </div>
    </>
  );
}
