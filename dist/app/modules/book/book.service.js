"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constants_1 = require("./book.constants");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const book = yield prisma_1.default.book.create({
        data: payload,
        include: {
            category: true,
        },
    });
    return book;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy, sortOrder } = options;
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, category, maxPrice, minPrice } = filters; //filter
    const andConditions = [];
    // Filtering by search term
    if (search) {
        andConditions.push({
            OR: book_constants_1.BookSearchableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const books = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.book.count();
    return {
        meta: {
            page,
            size,
            total,
            totalPage: Math.ceil(total / size),
        },
        data: books,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
        where: { id },
    });
    return book;
});
const getAllBooksByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(categoryId);
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const books = yield prisma_1.default.book.findMany({
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
});
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield prisma_1.default.book.update({
        where: { id },
        data: payload,
    });
    return updatedBook;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield prisma_1.default.book.delete({
        where: { id },
    });
    return deletedBook;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
    getAllBooksByCategoryId,
};
