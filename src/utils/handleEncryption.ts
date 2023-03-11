import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = async (password: string): Promise<string> => {
  const salt = await hash(password, SALT_ROUNDS);
  return salt;
};

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const result = await compare(password, hash);
  return result;
};

export { hashPassword, comparePassword };
