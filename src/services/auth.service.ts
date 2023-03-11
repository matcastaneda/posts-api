import { User } from '../models/User';
import { IUser, IUserDecoded, TAuth } from '../types';
import { comparePassword, hashPassword } from '../utils/handleEncryption';
import { createJWT, verifyJWT } from '../utils/handleJWT';

const login = async (credentials: TAuth): Promise<string | null> => {
  const { email, password } = credentials;

  const user: IUser | null = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return null;

  const { _id: userId } = user;

  const token = createJWT(userId) as string;

  return token;
};

const register = async (user: IUser) => {
  const { name, email, password } = user;

  const isUserRegistered = await User.findOne({ email });
  if (isUserRegistered) throw new Error('User already registered');

  const passwordHash = await hashPassword(password);

  const newUser = await User.create({ name, email, password: passwordHash });

  const { password: _, ...userWithoutPassword } = newUser.toJSON();

  return userWithoutPassword;
};

const renewToken = async (token: string) => {
  const { userId } = verifyJWT(token) as IUserDecoded;
  const newToken = createJWT(userId) as string;
  return newToken;
};

export default { login, register, renewToken };
