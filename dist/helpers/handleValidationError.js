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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const client_1 = require("@prisma/client");
const handleValidationError = (error) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    let status = 500;
    let message;
    let path;
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        status = 400;
        if (error.code === 'P2002') {
            message = `${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.target} has been used, please enter another ${(_b = error.meta) === null || _b === void 0 ? void 0 : _b.target}`;
            path = (_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.target) !== null && _d !== void 0 ? _d : '';
        }
        else if (error.code === 'P2003') {
            message = `The data is already used in another table: Foreign key constraint "${(_e = error.meta) === null || _e === void 0 ? void 0 : _e.field_name}"`;
            path = (_g = (_f = error.meta) === null || _f === void 0 ? void 0 : _f.field_name) !== null && _g !== void 0 ? _g : '';
        }
        else if (error.code === 'P2025') {
            message = 'data not exist';
        }
        else {
            message = `${error}`;
        }
    }
    else {
        message = `${error}`;
    }
    return {
        status,
        message: {
            msg: message,
            path: path
        }
    };
});
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=handleValidationError.js.map