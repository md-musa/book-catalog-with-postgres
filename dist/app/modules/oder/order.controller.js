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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { userId } = req.user;
    const result = yield order_service_1.OrderService.createOrder(userId, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
}));
const getSingleOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_service_1.OrderService.getSingleOrderById(orderId);
    const { role, userId } = req.user;
    if (role === user_1.USER_ROLE.CUSTOMER && (order === null || order === void 0 ? void 0 : order.userId) != userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: order,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let orders;
    if (user.role === user_1.USER_ROLE.ADMIN) {
        orders = yield order_service_1.OrderService.getAllOrders();
    }
    else {
        orders = yield order_service_1.OrderService.getSpecificCustomerOrder(user.userId);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Customer orders retrieve successfully',
        data: orders,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrderById,
};
