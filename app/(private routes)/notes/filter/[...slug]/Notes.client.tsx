'use client';

import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import styles from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
// import NoteForm from '@/components/NoteForm/NoteForm';
import { Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';

interface NotesClientProps {
  noteTag: string | undefined;
}

export default function NotesClient({ noteTag }: NotesClientProps) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ['notesList', searchValue, currentPage, noteTag],
    queryFn: () => fetchNotes(searchValue, currentPage, noteTag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      setCurrentPage(1);
    },
    500
  );

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchValue} onChange={handleChange} />

        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            forcePage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {
          <Link href="/notes/action/create" className={styles.button}>
            Create note +
          </Link>
        }
      </header>

      {data &&
        (data.notes.length >= 1 ? (
          <NoteList notes={data.notes} />
        ) : (
          <h2>Sorry, notes not found...</h2>
        ))}

      {isError && <h2>Somethings wrong. {error.message}</h2>}

      {isLoading && <Loader />}

      {/* {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )} */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
