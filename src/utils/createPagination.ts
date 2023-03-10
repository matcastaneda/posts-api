import type { IReqPagination, IPostPaginationReturned } from '../types';

const createPagination = ({ docs, totalDocs, page, limit }: IReqPagination): IPostPaginationReturned => {
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
