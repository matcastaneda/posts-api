import { NextFunction, Request, Response } from 'express';
import { IUserDecoded } from '../types';
import { verifyJWT } from '../utils/handleJWT';

const authVerify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized, please login first' });

  try {
    const decodedToken = verifyJWT(token) as IUserDecoded;

    req.user = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized, invalid token or expired' });
  }
};

export { authVerify };
