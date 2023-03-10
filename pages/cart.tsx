import CartTable from '@/components/CartTable';
import Page from '@/components/Page';
// import { useCart } from '@/hooks/cart';
import { fetchJson } from '@/lib/api';
import { useQuery } from 'react-query';
import { CartItem } from '@/lib/cart';

const QUERY_CART_ITEMS_KEY = 'cartItems';

const CartPage: React.FC = () => {
  const query = useQuery(QUERY_CART_ITEMS_KEY, () => fetchJson('/api/cart'));
  const cartItems: CartItem[] = query.data;

  return <Page title='Cart'>{cartItems && <CartTable cartItems={cartItems} />}</Page>;
};
export default CartPage;
