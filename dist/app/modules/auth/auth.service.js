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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    let user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (user)
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exits');
    payload.password = yield bcrypt_1.default.hash(password, Number(config_1.default.BCRYPT_SALT_ROUNDS));
    user = yield prisma_1.default.user.create({
        data: payload,
    });
    return user;
});
const login = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    let user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid email');
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: user.id,
        role: user.role,
    }, config_1.default.JWT.ACCESS_TOKEN_SECRET, config_1.default.JWT.ACCESS_TOKEN_EXPIRES_IN);
    // user = await prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     role: true,
    //     contactNo: true,
    //     address: true,
    //     profileImg: true,
    //   },
    // });
    return accessToken;
});
exports.AuthService = {
    signup,
    login,
};
