import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { Document, Model } from 'mongoose';

interface IUserDecoded extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserDecoded;
    }
  }
}

interface IPost {
  title: string;
  content: string;
  image?: { public_id: string; secure_url: string } | null;
  userId: string;
}

interface IFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}

interface IPostPaginationReturned {
  posts: IPost[];
  totalDocs: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface IReqPagination {
  docs: IPost[];
  totalDocs: number;
  page: number;
  limit: number;
}

type TQueryPagination = Pick<IQueryPagination, 'page' | 'limit'>;

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

type TAuth = Pick<IUser, 'email' | 'password'>;
