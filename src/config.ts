import { config } from 'dotenv';

config();

export const {
  PORT,
  NODE_ENV,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
