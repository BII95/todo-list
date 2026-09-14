import styles from '../styles/SortBy.module.css'
export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <label htmlFor="sortOptions">Sort by:</label>
      <select
        className={styles.select}
        name="sortOptions"
        id="sortOptions"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="createdAt">Created At</option>
        <option value="title">Title</option>
      </select>

      <label htmlFor="orderOptions">Order:</label>
      <select
        className={styles.select}
        name="orderOptions"
        id="orderOptions"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </>
  );
}
