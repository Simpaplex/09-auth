'use client';

import Image from 'next/image';
import styles from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { updateMe, UpdateRequest } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

function EditProfilePage() {
  const router = useRouter();
  const handleCancel = () => router.back();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const mutation = useMutation({
    mutationFn: (updatedUser: UpdateRequest) => updateMe(updatedUser),
    onSuccess: response => {
      toast.success('Profile updated');
      setUser(response);
      router.push('/profile');
    },
    onError: error => {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const newUserName = formData.get('userName') as string;
    if (newUserName === '') {
      toast.error('Username must be more than one character');
      return;
    }
    if (user) {
      const updatedUser = {
        username: newUserName,
        email: user.email,
      };
      mutation.mutate(updatedUser);
    }
  };

  return (
    user && (
      <main className={styles.mainContent}>
        <div className={styles.profileCard}>
          <h1 className={styles.formTitle}>Edit Profile</h1>

          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={styles.avatar}
          />

          <form className={styles.profileInfo} action={handleSubmit}>
            <div className={styles.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="userName"
                type="text"
                className={styles.input}
              />
            </div>

            <p>Email: {user.email}</p>

            <div className={styles.actions}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    )
  );
}

export default EditProfilePage;
