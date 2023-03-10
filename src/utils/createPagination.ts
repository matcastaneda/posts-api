import type { IReqPagination, IPostPagination } from '../types';

const createPagination = ({ docs, totalDocs, page, limit }: IReqPagination): IPostPagination => {
  const totalPages = Math.ceil(totalDocs / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const itemsPerPage = docs.length;

  const paginatedResults = {
    posts: docs,
    totalDocs,
    totalPages,
    currentPage: page,
    itemsPerPage,
    hasNextPage,
    hasPrevPage,
  };

  return paginatedResults;
};

export { createPagination };
