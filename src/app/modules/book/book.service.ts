import { Book, Prisma } from '@prisma/client';
import { IFilters, paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './book.constants';

const createBook = async (payload: Book): Promise<Book> => {
  console.log(payload);
  const book = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return book;
};

const getAllBooks = async (filters: IFilters, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  const { sortBy, sortOrder } = options;
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, category, maxPrice, minPrice } = filters; //filter
  const andConditions: any[] = [];

  // Filtering by search term
  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  // Filtering by category id
  if (category) {
    andConditions.push({
      AND: {
        categoryId: {
          equals: category,
        },
      },
    });
  }
  // Filtering by minimum price
  if (Number(minPrice)) {
    andConditions.push({
      AND: {
        price: {
          gte: Number(minPrice),
        },
      },
    });
  }
  // Filtering by maximum price

  if (Number(maxPrice)) {
    andConditions.push({
      AND: {
        price: {
          lte: Number(maxPrice),
        },
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const books = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,

    orderBy: {
      [sortBy as string]: sortOrder,
    },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      page,
      size,
      total,
      totalPage: Math.ceil(total / size),
    },
    data: books,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  return book;
};

const getAllBooksByCategoryId = async (categoryId: string, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  console.log(categoryId);
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
  });

  return {
    meta: {
      page,
      size,
      total: books.length,
      totalPage: Math.ceil(books.length / size),
    },
    data: books,
  };
};

const updateSingleBook = async (id: string, payload: Partial<Book>): Promise<Book> => {
  const updatedBook = await prisma.book.update({
    where: { id },
    data: payload,
  });

  return updatedBook;
};

const deleteSingleBook = async (id: string): Promise<Book | null> => {
  const deletedBook = await prisma.book.delete({
    where: { id },
  });

  return deletedBook;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  getAllBooksByCategoryId,
};
