// option 1: fetch products on the server side (in getStaticProps with revalidation)

import Head from 'next/head';
import { Inter } from 'next/font/google';
import Title from '@/components/Title';
import { getProducts } from '@/lib/products';

const inter = Inter({ subsets: ['latin'] });

export async function getStaticProps() {
  console.log('[HomePage] getStaticProps()');

  const products = await getProducts();

  console.log(products);
  return {
    props: {
      products,
    },
    revalidate: 30, //seconds
  };
}

export default function HomePage({ products }) {
  console.log('[HomePage] render:', products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
        <meta name='description' content='Next Shop' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='px-6 py-4'>
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
