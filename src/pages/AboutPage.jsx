import styles from '../styles/AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.heading}>
            Organize your tasks.{' '}
            <span className={styles.accentText}>Ship your day.</span>
          </h1>
          <p className={styles.subtext}>
            A React-based todo application built to help you track what matters
            and clear it fast.
          </p>
        </section>

        <div className={styles.cardGrid}>
          <section className={styles.card}>
            <h2 className={styles.cardHeading}>Features</h2>
            <ul className={styles.list}>
              <li>Add new todos</li>
              <li>Mark todos as complete</li>
              <li>Edit existing todos</li>
              <li>Sort todos by date or title</li>
              <li>User authentication with protected routes</li>
            </ul>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardHeading}>Built With</h2>
            <ul className={styles.list}>
              <li>React 19.2.7</li>
              <li>React Router 8</li>
              <li>Vite 8</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
