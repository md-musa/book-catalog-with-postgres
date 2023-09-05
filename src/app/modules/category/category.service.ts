import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createCategory = async (title: string): Promise<Category> => {
  const category = await prisma.category.create({
    data: {
      title,
    },
  });

  return category;
};

const getAllCategory = async (): Promise<Category[]> => {
  const category = await prisma.category.findMany();

  return category;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
};

const updateCategory = async (id: string, title: string): Promise<Category | null> => {
  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  return updatedCategory;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const deleteCategory = await prisma.category.delete({
    where: {
      id,
    },
  });

  return deleteCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
