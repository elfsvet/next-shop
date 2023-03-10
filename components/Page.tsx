import { PropsWithChildren } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Title from './Title';

interface PageProps extends PropsWithChildren {
  title: string;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - Next Shop</title>
        <meta name='description' content={title} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='px-6 py-4'>
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
};
export default Page;
