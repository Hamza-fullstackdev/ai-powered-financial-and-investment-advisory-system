import bcrypt from 'bcrypt';
import { config } from '@/app/api/utils/env-config';

export const hashedPassword = async (password: string): Promise<string> => {
  const salts = config.saltRounds;
  const salt = await bcrypt.genSalt(salts);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
