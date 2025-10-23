'use client'


import { useAuthStore } from '@/lib/store/authStore'
import styles from './SignInPage.module.css'
import { logIn, LoginRequest } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ApiError } from '@/app/api/api'


const SignInPage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  // const {setUser} = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleAction = async (formData: FormData) => {
    try {
      const loginData = Object.fromEntries(formData) as unknown as LoginRequest;
      const user = await logIn(loginData);
      if(user) {
        setUser(user);
        router.replace("/profile")
      } else {
      setError('Invalid email or password');
    }
    
    }
    catch (error) {
          setError(
            (error as ApiError).response?.data?.error ??
              (error as ApiError).message ??
            'Oops... some error'
                    
          );
        }
      }


  return (
    <main className={styles.mainContent}>
      <form className={styles.form} action={handleAction}>
        <h1 className={styles.formTitle}>Login</h1>

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
            Log in
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignInPage;