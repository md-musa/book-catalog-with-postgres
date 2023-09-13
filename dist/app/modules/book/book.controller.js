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
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const book = yield book_service_1.BookService.createBook(bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created successfully',
        data: book,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Book fetched successfully',
        data: book,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['search', 'minPrice', 'maxPrice', 'category']);
    const options = (0, pick_1.default)(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
    const result = yield book_service_1.BookService.getAllBooks(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getAllBooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const options = (0, pick_1.default)(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
    const result = yield book_service_1.BookService.getAllBooksByCategoryId(categoryId, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books with associated category data fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const updateSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookData = req.body;
    const updatedBook = yield book_service_1.BookService.updateSingleBook(id, bookData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
    });
}));
const deleteSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedBook = yield book_service_1.BookService.deleteSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book has been deleted successfully',
        data: deletedBook,
    });
}));
exports.BookController = {
    createBook,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
    getAllBooksByCategoryId,
    getAllBooks,
};
