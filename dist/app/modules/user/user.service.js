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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return users;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUserData = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return updatedUserData;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return deletedUser;
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getProfile,
};
