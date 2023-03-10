export interface IPost {
  title: string;
  content: string;
  image?: { public_id: string; secure_url: string } | null;
}

export interface IFile {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}

export interface IPostPagination {
  posts: IPost[];
  totalDocs: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IReqPagination {
  docs: IPost[];
  totalDocs: number;
  page: number;
  limit: number;
}

export type TQueryPagination = Pick<IQueryPagination, 'page' | 'limit'>;
