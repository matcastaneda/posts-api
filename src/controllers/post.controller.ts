import { Request, Response, NextFunction } from 'express';
import { remove as removeFile } from 'fs-extra';

import { removeImage, uploadImage } from '../lib/cloudinary';
import postService from '../services/post.service';
import { type IFile } from '../types';

const getAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.getAll();

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await postService.getOne(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { title, content } = req.body;
    
    if (!title) return res.status(400).json({ message: 'Title is required' });
    if (!content) return res.status(400).json({ message: 'Content is required' });
    
    let image = null;
    
    if (req.files?.image) {
      const { tempFilePath }: IFile = req.files?.image as IFile;
      const { public_id, secure_url } = await uploadImage(tempFilePath);
      await removeFile(tempFilePath);

      image = { public_id, secure_url };
    }

    const post = await postService.create({ title, content, image });
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    let image = null;

    const post = await postService.getOne(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (req.files?.image) {
      const { tempFilePath }: IFile = req.files?.image as IFile;
      const { public_id, secure_url } = await uploadImage(tempFilePath);
      await removeFile(tempFilePath);
      image = { public_id, secure_url };

      if (post.image?.public_id) {
        await removeImage(post.image.public_id);
      }
    }

    const updatedPost = await postService.update(id, { title, content, image });

    return res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await postService.remove(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post && post.image?.public_id) {
      await removeImage(post.image?.public_id as string);
    }

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export { getAll, getOne, create, update, remove };
