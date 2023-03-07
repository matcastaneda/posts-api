import { config } from 'dotenv';

config();

export const { PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, MONGO_URI } = process.env;
