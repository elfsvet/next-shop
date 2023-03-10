import { fetchJson } from '@/lib/api';
import { User } from '@/lib/user';
import cookie from 'cookie';
import { NextApiHandler } from 'next';

const { CMS_URL } = process.env;

const handleRegister: NextApiHandler<User> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    try {
      const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      //TODO set jwt in cookies
      res
        .status(200)
        .setHeader(
          'Set-Cookie',
          cookie.serialize('jwt', jwt, {
            path: '/api',
            httpOnly: true,
            // expires add if you want to add expiration other than closing the browser
          })
        )
        .json({
          id: user.id,
          name: user.username,
        });
    } catch (err) {
      res.status(401).end();
    }
  }
};
export default handleRegister;
