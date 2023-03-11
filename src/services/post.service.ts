import { Post } from '../models/Post';
import type { IPost, IPostPaginationReturned, TQueryPagination } from '../types';
import { createPagination } from '../utils/createPagination';

const getAll = async (userId: string, query?: TQueryPagination): Promise<IPostPaginationReturned> => {
  const { page, limit } = query ?? {};

  const skip = (page - 1) * limit;

  const [posts, totalDocs] = await Promise.all([
    Post.find({ userId }).sort({ createdAt: 'desc' }).skip(skip).limit(limit).lean().exec(),
    Post.countDocuments({ userId }),
  ]);

  const docs = posts.map(({ _id, ...rest }) => ({
    id: String(_id),
    ...rest,
  }));

  const paginatedPosts = createPagination({ docs, totalDocs, page, limit });

  return paginatedPosts;
};

const getOne = async (id: string, userId: string) => await Post.findOne({ _id: id, userId });

const create = async (post: IPost) => await Post.create(post);

const update = async (id: string, post: IPost) => await Post.findByIdAndUpdate(id, post, { new: true });

const remove = async (id: string) => await Post.findByIdAndRemove(id);

export default { getAll, getOne, create, update, remove };
