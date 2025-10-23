import NoteForm from '@/components/NoteForm/NoteForm';
import styles from './CreateNote.module.css';
import { Metadata } from 'next';



export const metadata: Metadata = {
  title: `Create Note`,
  description: 'Page for note creation form',
  openGraph: {
    title: `Create Note`,
    description: 'Page for note creation form',
    url: 'https://09-auth-iota-taupe.vercel.app/notes/action/create',
    siteName: '09-Auth',
    images: [
      {
        url: '/create_note.jpg',
        width: 1200,
        height: 630,
        alt: 'note creation form',
      },
    ],
    type: 'article',
  },
};


const CreateNote = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm/>
      </div>
    </main>
  );
}

export default CreateNote;