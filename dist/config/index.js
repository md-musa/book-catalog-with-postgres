"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT: {
        ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
};
