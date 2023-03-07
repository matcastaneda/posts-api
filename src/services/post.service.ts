import { Post } from '../models/Post';
import { type IPost } from '../types';

const getAll = async () => await Post.find({});

const getOne = async (id: string) => await Post.findById(id);

const create = async (post: IPost) => await Post.create(post);

const update = async (id: string, post: IPost) => await Post.findByIdAndUpdate(id, post, { new: true });

const remove = async (id: string) => await Post.findByIdAndRemove(id);

export default { getAll, getOne, create, update, remove };
