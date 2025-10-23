import Link from 'next/link';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist or has been moved.',
  openGraph: {
    title: 'Page Not Found',
    description: 'This page does not exist or has been moved.',
    siteName: '09-Auth',
    images: [
      {
        url: '/not_found.png',
        width: 1200,
        height: 630,
        alt: 'page not found',
      },
    ],
    type: 'article',
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={'/'}>Back to home</Link>
    </>
  );
};

export default NotFound;
