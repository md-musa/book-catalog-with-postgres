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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: users,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_service_1.UserService.getSingleUser(id);
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const { password } = user, otherInfo = __rest(user, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User getched successfully',
        data: user,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const updatedUserData = yield user_service_1.UserService.updateUser(id, data);
    if (!updatedUserData)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const { password } = updatedUserData, otherInfo = __rest(updatedUserData, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: otherInfo,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield user_service_1.UserService.deleteUser(id);
    if (!deletedUser)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const { password } = deletedUser, otherInfo = __rest(deletedUser, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully',
        data: otherInfo,
    });
}));
const getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const user = yield user_service_1.UserService.getProfile(userId);
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    if (userId != (user === null || user === void 0 ? void 0 : user.id)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    const { password } = user, otherInfo = __rest(user, ["password"]);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile fetched successful',
        data: otherInfo,
    });
}));
exports.UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getProfile,
};
