import styles from '../styles/FilterInput.module.css'
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
        ></input>
      </div>
    </>
  );
}
