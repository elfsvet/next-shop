import { CartItem } from '@/lib/cart';

interface CartTableProps {
  cartItems: CartItem[];
}

interface Cart {
  items: (CartItem & { total: number })[];
  total: number;
}

//@ts-ignore

function buildCart(cartItems: CartItem[]): Cart {
  // if (cartItems) {
  let total = 0.0;
  const items = [];
  for (const item of cartItems) {
    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;
    items.push({ ...item, total: itemTotal });
  }
  return { items, total };
  // }
}

const formatCurrency = (value: number): string => {
  return `$ ${value.toFixed(2)}`;
};

const CartTable: React.FC<CartTableProps> = ({ cartItems }) => {
  const cart = buildCart(cartItems);

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Product</th>
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>Quantity</th>
            <th className='px-6 py-3'>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            // cart &&
            cart.items.map((item) => (
              <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700' key={item.id}>
                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {item.product.title}
                </th>
                <td className='px-6 py-4 text-right'>{formatCurrency(item.product.price)}</td>
                <td className='px-6 py-4 text-right'>{item.quantity}</td>
                <td className='px-6 py-4 text-right'>{formatCurrency(item.total)}</td>
              </tr>
            ))
          }
          <tr className='bg-white border-b dark:bg-gray-700 dark:border-gray-700'>
            <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-lg'>Total:</th>
            <th></th>
            <th></th>
            <th className='px-6 py-4 text-right'>{cart && formatCurrency(cart.total)}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CartTable;
