
import { getServerMe } from "@/lib/api/serverApi";
import styles from "./ProfilePage.module.css"
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile Page`,
  description: 'User data page',
  openGraph: {
    title: `Profile Page`,
    description: 'User data page',
    url: 'https://09-auth-iota-taupe.vercel.app/profile',
    siteName: '09-Auth',
    images: [
      {
        url: '/users_profile.jpg',
        width: 1200,
        height: 630,
        alt: 'profile page',
      },
    ],
    type: 'article',
  },
};


const ProfilePage = async () => {
  
  const user = await getServerMe();
  
  return (
    <main className={styles.mainContent}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1 className={styles.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={styles.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={styles.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>
        <div className={styles.profileInfo}>
          <p>Username: {user.username }</p>
          <p>Email: {user.email }</p>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;