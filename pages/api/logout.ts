import cookie from 'cookie';
import { NextApiHandler } from 'next';

const handleLogout: NextApiHandler = async (req, res) => {
  res
    .status(200)
    .setHeader(
      'Set-Cookie',
      cookie.serialize('jwt', '', {
        path: '/api',
        expires: new Date(0),
        // expires add if you want to add expiration other than closing the browser
      })
    )
    .json({});
};
export default handleLogout;
