import { NextApiHandler } from 'next';

const handleRevalidate: NextApiHandler = async (req, res) => {
  const event = req.body;
  if (event.model === 'product') {
    const id = event.entry.id;
    await Promise.all([await res.revalidate('/'), await res.revalidate(`/products/${id}`)]);
    console.log(`revalidated product ${id}`);
  }
  res.status(204).end();
};

export default handleRevalidate;
