import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/LoginPage.module.css';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || '/todos';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle login form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError('');
    setIsLoggingOn(true);
    try {
      const result = await login(email, password);

      if (!result.success) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <h1 className={styles.brandHeading}>
            Get it <span className={styles.accentText}>done.</span>
          </h1>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formContent}>
          <h2 className={styles.formHeading}>Sign in</h2>
          <p className={styles.formSubtext}>Access your command center.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {authError && <p className={styles.error}>{authError}</p>}

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="text"
                className={styles.input}
                placeholder="alex@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoggingOn}
            >
              {isLoggingOn ? 'Loggin in...' : 'Log on →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
