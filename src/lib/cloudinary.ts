import cloudinaryModule, { UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.api.ping(error => {
  if (error) {
    console.error('[❌] Cloudinary connection failed:', error.message);
  } else {
    console.log('[✅] Cloudinary successfully connected.');
  }
});

const uploadImage = async (tempFilePath: string): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(tempFilePath, {
    folder: 'posts',
  });
};

const removeImage = async (public_id: string): Promise<void> => {
  return await cloudinary.uploader.destroy(public_id);
};

export { uploadImage, removeImage };
