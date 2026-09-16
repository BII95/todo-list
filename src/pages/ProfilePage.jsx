import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/ProfilePage.module.css';
import Spinner from '../shared/Spinner';

export default function ProfilePage() {
  const { email, name, token } = useAuth();
  const [todoStats, setTodoStats] = useState({
    totalTodos: 0,
    completedTodos: 0,
    activeTodos: 0,
    completionPercent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const response = await fetch('/api/tasks?limit=100', {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();

        const todos = data.tasks ?? data;
        const totalTodos = todos.length;

        const completedTodos = todos.filter((todo) => todo.isCompleted).length;
        const activeTodos = totalTodos - completedTodos;
        const completionPercent =
          totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

        setTodoStats({
          totalTodos,
          completedTodos,
          activeTodos,
          completionPercent,
        });
      } catch (error) {
        setError(`Error loading stats: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTodoStats();
  }, [token]);

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>ACCOUNT</p>
          <h1 className={styles.heading}>
            {name}'s <span className={styles.accentText}>profile.</span>
          </h1>
          <p className={styles.subtext}>{email}</p>
        </section>

        <div className={styles.cardGrid}>
          <section className={styles.card}>
            <h2 className={styles.cardHeading}>Account Information</h2>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}>
                <dt>Name</dt>
                <dd>{name}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt>Email</dt>
                <dd>{email}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt>Status</dt>
                <dd>
                  {todoStats.totalTodos > 0 ? 'Active user' : 'No tasks yet'}
                </dd>
              </div>
            </dl>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardHeading}>Todo Statistics</h2>

            {isLoading && <Spinner label="Loading statistics..." />}
            {!isLoading && error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            {!isLoading && !error && (
              <>
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>Completion rate</span>
                  <span className={styles.progressPercent}>
                    {todoStats.completionPercent}%
                  </span>
                </div>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={todoStats.completionPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${todoStats.completionPercent}%` }}
                  />
                </div>

                <div className={styles.statGrid}>
                  <div className={styles.stat}>
                    <strong className={styles.statNumber}>
                      {todoStats.totalTodos}
                    </strong>
                    <span className={styles.statLabel}>TOTAL</span>
                  </div>
                  <div className={styles.stat}>
                    <strong className={styles.statNumber}>
                      {todoStats.completedTodos}
                    </strong>
                    <span className={styles.statLabel}>COMPLETED</span>
                  </div>
                  <div className={styles.stat}>
                    <strong className={styles.statNumber}>
                      {todoStats.activeTodos}
                    </strong>
                    <span className={styles.statLabel}>ACTIVE</span>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
