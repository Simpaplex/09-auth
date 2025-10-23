'use client';

import { register, RegisterRequest } from '@/lib/api/clientApi';
import styles from './SignUpPage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';

function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleRegister = async (formData: FormData) => {
    try {
      const registerData = Object.fromEntries(
        formData
      ) as unknown as RegisterRequest;
      const user = await register(registerData);
      if (user) {
        setUser(user);
        router.replace('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={styles.mainContent}>
      <form className={styles.form} action={handleRegister}>
        <h1 className={styles.formTitle}>Registration</h1>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignUpPage;
