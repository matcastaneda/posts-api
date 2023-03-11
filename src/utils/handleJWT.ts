import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config';

export const createJWT = (userId: string): string => {
  const token = sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
};

export const verifyJWT = (token: string) => {
  const payload = verify(token, JWT_SECRET) as JwtPayload;
  return payload;
};
