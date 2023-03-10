import AddCartWidget from '@/components/AddCartWidget';
import Page from '@/components/Page';
import { useUser } from '@/hooks/user';
import { ApiError } from '@/lib/api';
import { getProduct, getProducts, Product } from '@/lib/products';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking',
  };
};
// @ts-ignore
export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageParams> = async ({ params: { id } }) => {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: +process.env.REVALIDATE_SECONDS!,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true };
    }
    throw error;
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const user = useUser();
  return (
    <Page title={product.title}>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div>
          <Image src={product.pictureUrl} alt={product.title} width={640} height={480} />
        </div>
        <div className='flex-1'>
          <p className='text-sm'>{product.description}</p>
          <p className='text-lg font-bold mt-2'>{product.price}</p>
          {user && <AddCartWidget productId={product.id} />}
        </div>
      </div>
    </Page>
  );
};
export default ProductPage;
