import { Request, Response, NextFunction } from 'express';
import { remove as removeFile } from 'fs-extra';

import { removeImage, uploadImage } from '../lib/cloudinary';
import postService from '../services/post.service';
import type { IFile, TQueryPagination } from '../types';
import { sanitizeQuery } from '../utils/sanitizeQuery';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query;
  const { userId } = req.user;

  try {
    const sanitizedPage = sanitizeQuery(page as string) || 1;
    const sanitizedLimit = sanitizeQuery(limit as string) || 10;

    const query: TQueryPagination = { page: sanitizedPage, limit: sanitizedLimit };

    const posts = await postService.getAll(userId, query);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const post = await postService.getOne(id, userId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  try {
    if (!title) return res.status(400).json({ message: 'Title is required' });
    if (!content) return res.status(400).json({ message: 'Content is required' });

    let image = null;

    if (req.files?.image) {
      const { tempFilePath }: IFile = req.files?.image as IFile;
      const { public_id, secure_url } = await uploadImage(tempFilePath);
      await removeFile(tempFilePath);

      image = { public_id, secure_url };
    }

    const post = await postService.create({ title, content, image, userId });
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { userId } = req.user;
  let image = null;

  try {
    const post = await postService.getOne(id, userId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (req.files?.image) {
      const { tempFilePath }: IFile = req.files?.image as IFile;
      const { public_id, secure_url } = await uploadImage(tempFilePath);
      await removeFile(tempFilePath);
      image = { public_id, secure_url };

      if (post.image?.public_id) {
        await removeImage(post.image.public_id);
      }
    } //640ca1aec20df9435f133ac7

    const updatedPost = await postService.update(id, { title, content, image, userId });

    return res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
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
