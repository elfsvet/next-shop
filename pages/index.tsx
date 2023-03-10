import { getProducts, Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Page from '@/components/Page';
import { GetStaticProps } from 'next';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // console.log('[HomePage] getStaticProps()');
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: +process.env.REVALIDATE_SECONDS!,
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  // console.log('[HomePage] render:', products);
  return (
    <Page title='Indoor Plants'>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
};
export default HomePage;
