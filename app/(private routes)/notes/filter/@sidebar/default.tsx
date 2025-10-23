import Link from 'next/link';
import styles from './SidebarNotes.module.css'

const tagsList = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const SidebarNotes = () => {

  return (
    <ul className={styles.menuList}>
      <li className={styles.menuItem}>
        <Link href={'/notes/filter/All'} className={styles.menuLink}>
          All notes
        </Link>
      </li>
      {tagsList.map(item => (
        <li key={`tagsList-${item}`} className={styles.menuItem}>
          <Link href={`/notes/filter/${item}`} className={styles.menuLink}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}


export default SidebarNotes;