'use client';

import Modal from '@/components/Modal/Modal';
import styles from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';



export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

   const { data, isError, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
   });
  
  const router = useRouter();

  // function handleClose() { router.back() };

  const handleClose = () => router.back();

  if (isError)  { return <p>Something went wrong.{error.message}</p> };
  if (isLoading)  { return <p>Loading note, please wait...</p> };
  
  return (
    <>
      {data && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <div className={styles.item}>
              <div className={styles.header}>
                <h2>{data?.title}</h2>
              </div>
              <p className={styles.content}>{data?.content}</p>
              <p className={styles.date}>Created date: {data?.createdAt}</p>
              <button className={styles.backBtn} onClick={handleClose}>
                Go back
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
