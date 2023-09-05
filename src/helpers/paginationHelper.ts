export type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type IFilters = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
};

type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 10);
  const skip = (page - 1) * size;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
