
import { getServerMe } from "@/lib/api/serverApi";
import styles from "./ProfilePage.module.css"
import Link from "next/link";
import Image from "next/image";

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