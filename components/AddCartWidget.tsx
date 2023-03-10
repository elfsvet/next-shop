import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { fetchJson } from '@/lib/api';
import Button from './Button';

interface AddToCartWidgetProps {
  productId: number;
}

const AddToCartWidget: React.FC<AddToCartWidgetProps> = ({ productId }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const mutation = useMutation(() =>
    fetchJson('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
  ); //post put delete);
  // TODO useMutation
  const handleClick = async () => {
    await mutation.mutateAsync();
    router.push('/cart');
    console.log('should add to cart:', { productId, quantity });
  };

  return (
    <div className='flex gap-2 items-baseline'>
      <input
        type='number'
        min='1'
        className='w-16 py-1 px-3 border rounded text-right'
        value={quantity.toString()}
        onChange={(e) => {
          setQuantity(+e.target.value);
        }}
      />
      {mutation.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button type='button' onClick={handleClick}>
          Add to cart
        </Button>
      )}
    </div>
  );
};
export default AddToCartWidget;
