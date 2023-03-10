import { fetchJson } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const CART_ITEMS_QUERY_KEY = 'cartItems';

// export function useCart() {
//   const queryClient = useQueryClient();
//   const mutation = useMutation(() => fetchJson('/api/cart'));
//   return {
//     cartItems: async () => {
//       try {
//         const cartItems = await mutation.mutateAsync();
//         queryClient.setQueriesData(CART_ITEMS_QUERY_KEY, cartItems);
//         return true;
//       } catch (error) {
//         return false;
//       }
//     },
//     cartError: mutation.isError,
//     cartLoading: mutation.isLoading,
//   };
// }
