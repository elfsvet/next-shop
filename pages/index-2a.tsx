// option 2 : fetch products on the client side (in useEffect) directly from external api

import Head from 'next/head';
import { Inter } from 'next/font/google';
import Title from '@/components/Title';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products';
const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

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
