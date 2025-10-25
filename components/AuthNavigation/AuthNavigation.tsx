'use client';

import Link from 'next/link';
import styles from './AuxNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logOut } from '@/lib/api/clientApi';

const AuthNavigation = () => {
  const router = useRouter();

  const { user, isAuthenticated } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  async function handleLogout() {
    await logOut();
    clearIsAuthenticated();
    router.replace('/sign-in');
  }

  return isAuthenticated ? (
    <>
      <li className={styles.navigationItem}>
        <Link
          href="/profile"
          prefetch={false}
          className={styles.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <p className={styles.userEmail}>{user?.username}</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={styles.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={styles.navigationLink}>
          Login
        </Link>
      </li>

      <li className={styles.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={styles.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
