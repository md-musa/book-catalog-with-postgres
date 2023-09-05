import { Book, Prisma } from '@prisma/client';
import { IFilters, paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './book.constants';

const createBook = async (bookData: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data: bookData,
  });

  return book;
};

const getBooks = async (filters: IFilters, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterableData } = filters;

  const andConditions: any[] = [];

  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contain: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterableData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterableData).map(field => ({
        [field]: {
          equal: (filterableData as any)[field],
        },
      })),
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
      totalPage: Number(total / size),
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

const updateBook = async (id: string, bookData: Partial<Book>): Promise<Book> => {
  const updatableData: Partial<Book> = {};

  Object.keys(bookData).forEach((key: string) => {
    if ((bookData as string)[key as any].length) updatableData[key as string] = bookData[key as string];
  });

  const updatedBook = await prisma.book.update({
    where: { id },
    data: updatableData,
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
};
