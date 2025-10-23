import styles from './NotesPage.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/clientApi';

interface notesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: notesProps): Promise<Metadata> {
  const { slug } = await params;
  const [tag] = slug;
  const noteTag = tag === 'All' ? 'All notes' : tag;

  return {
    title: `Notes tag: ${noteTag}`,
    description: `Page with selected notes by tag ${noteTag}`,
    openGraph: {
      title: `Note tag: ${noteTag}`,
      description: `Page with selected notes by tag ${noteTag}`,
      url: `https://08-zustand-eight-xi.vercel.app/notes/filter/${noteTag}`,
      siteName: '09-Auth',
      images: [
        {
          url: '/note_list.jpg',
          width: 1200,
          height: 630,
          alt: `filter by tag ${noteTag}`,
        },
      ],
      type: 'article',
    },
  };
}

export default async function Notes({ params }: notesProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const [tag] = slug;

  const noteTag = tag === 'All' ? undefined : tag;

  const searchValue: string = '';
  const currentPage: number = 1;

  await queryClient.prefetchQuery({
    queryKey: ['notesList', searchValue, currentPage, noteTag],
    queryFn: () => fetchNotes(searchValue, currentPage, noteTag),
  });

  return (
    <div className={styles.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient noteTag={noteTag} />
      </HydrationBoundary>
    </div>
  );
}
