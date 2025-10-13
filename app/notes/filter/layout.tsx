import styles from './LayoutNotes.module.css'

interface NotesLayoutProps{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = ({children, sidebar}: NotesLayoutProps) => {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.notesWrapper}>{children}</div>
    </section>
  );
}

export default NotesLayout;