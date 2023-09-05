import { Book, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBook = async (bookData: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data: bookData,
  });

  return book;
};

// Pagination
const getAllBooks = async (): Promise<Book[]> => {
  const books = await prisma.book.findMany();

  return books;
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
    if (bookData[key].length) updatableData[key] = bookData[key];
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
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
