"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        role: zod_1.z.enum(['customer', 'admin']).default('customer'),
        contactNo: zod_1.z.string({
            required_error: 'contact number is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        profileImg: zod_1.z.string(),
    })
        .strict(),
});
exports.AuthValidation = {
    create,
};
