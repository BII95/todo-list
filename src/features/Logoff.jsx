import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import styles from '../styles/Logoff.module.css';
import Spinner from '../shared/spinner';

export default function Logoff() {
  const { logout} = useAuth();
  const [logoffError, setLogoffError] = useState('');
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const navigate = useNavigate();

  async function handleLogoff() {
    setIsLoggingOff(true);
    const result = await logout();
    if (result.success) {
      navigate('/login');
    } else {
      setLogoffError(result.error);
    }
    setIsLoggingOff(false);
  }

  return (
    <div className={styles.wrapper}>
      {logoffError && <p className={styles.error}>{logoffError}</p>}
      <button
        className={styles.logoffButton}
        onClick={handleLogoff}
        disabled={isLoggingOff}
      >
        {isLoggingOff && <Spinner />}
        {isLoggingOff ? 'Logging off…' : 'Log off'}
      </button>
    </div>
  );
}
