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

const getBooks = async (filters: IFilters, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, maxPrice, minPrice, category } = filters; // search, maxPrice, minPrice, category

  const andConditions: any[] = [];

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

  if (category) {
    andConditions.push({
      AND: {
        categoryId: {
          equals: category,
        },
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const books = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,

    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy as string]: [options.sortOrder],
          }
        : { createdAt: 'desc' },
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

const getBooksByCategoryId = async (categoryId: string, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  console.log(categoryId);
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy as string]: [options.sortOrder],
          }
        : { createdAt: 'desc' },
  });
  const total = await prisma.book.findMany({ where: { id: categoryId } });

  return {
    meta: {
      page,
      size,
      total: total.length,
      totalPage: Math.floor(total.length / size),
    },
    data: books,
  };
};

const updateBook = async (id: string, payload: Partial<Book>): Promise<Book> => {
  const updatedBook = await prisma.book.update({
    where: { id },
    data: payload,
  });

  return updatedBook;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const deletedBook = await prisma.book.delete({
    where: { id },
  });

  return deletedBook;
};

export const BookService = {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategoryId,
};
