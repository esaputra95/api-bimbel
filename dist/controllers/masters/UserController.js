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
exports.getDataById = exports.deleteData = exports.updateData = exports.postData = exports.getData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PrismaService_1 = __importDefault(require("../../services/PrismaService"));
const client_1 = require("@prisma/client");
const handleValidationError_1 = require("../../helpers/handleValidationError");
const errorType_1 = require("../../helpers/errorType");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const query = req.query;
        // PAGING
        const take = parseInt((_a = query.limit) !== null && _a !== void 0 ? _a : 20);
        const page = parseInt((_b = query.page) !== null && _b !== void 0 ? _b : 1);
        const skip = (page - 1) * take;
        // FILTER
        let filter = [];
        query.name ? filter = [...filter, { name: { contains: query.name } }] : null;
        query.username ? filter = [...filter, { username: { contains: query.username } }] : null;
        query.email ? filter = [...filter, { email: { contains: query.email } }] : null;
        query.phone ? filter = [...filter, { phone: { contains: query.phone } }] : null;
        if (filter.length > 0) {
            filter = {
                OR: [
                    ...filter
                ]
            };
        }
        const data = yield PrismaService_1.default.users.findMany({
            where: Object.assign({}, filter),
            skip: skip,
            take: take
        });
        const total = yield PrismaService_1.default.users.count({
            where: Object.assign({}, filter)
        });
        res.status(200).json({
            status: true,
            message: "successful in getting user data",
            data: {
                users: data,
                info: {
                    page: page,
                    limit: take,
                    total: total
                }
            }
        });
    }
    catch (error) {
        console.log({ error });
        res.send({
            status: false,
            message: error
        });
    }
});
exports.getData = getData;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt();
        const newPass = yield bcryptjs_1.default.hash(req.body.password, salt);
        const data = Object.assign(Object.assign({}, req.body), { password: newPass });
        yield PrismaService_1.default.users.create({ data: data });
        res.status(200).json({
            status: true,
            message: 'successful in created user data'
        });
    }
    catch (error) {
        let message = errorType_1.errorType;
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            message = yield (0, handleValidationError_1.handleValidationError)(error);
        }
        res.status(500).json({
            status: message.status,
            errors: [
                message.message
            ]
        });
    }
});
exports.postData = postData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt();
        const data = Object.assign({}, req.body);
        if (!req.body.password) {
            delete data.password;
        }
        else {
            data.password = yield bcryptjs_1.default.hash(req.body.password, salt);
        }
        yield PrismaService_1.default.users.update({
            where: {
                id: req.params.id
            },
            data: data
        });
        res.status(200).json({
            status: true,
            message: 'successful in updated user data'
        });
    }
    catch (error) {
        let message = errorType_1.errorType;
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            message = yield (0, handleValidationError_1.handleValidationError)(error);
        }
        res.status(500).json({
            status: message.status,
            errors: [
                message.message
            ]
        });
    }
});
exports.updateData = updateData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield PrismaService_1.default.users.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: false,
            message: 'successfully in deleted user data'
        });
    }
    catch (error) {
        let message = {
            status: 500,
            message: { msg: `${error}` }
        };
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            message = yield (0, handleValidationError_1.handleValidationError)(error);
        }
        res.status(500).json({
            status: message.status,
            errors: [
                message.message
            ]
        });
    }
});
exports.deleteData = deleteData;
const getDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = yield PrismaService_1.default.users.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (!model)
            throw new Error('data not found');
        res.status(200).json({
            status: true,
            message: 'successfully in get user data',
            data: {
                users: model
            }
        });
    }
    catch (error) {
        let message = {
            status: 500,
            message: { msg: `${error}` }
        };
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            message = yield (0, handleValidationError_1.handleValidationError)(error);
        }
        res.status(500).json({
            status: message.status,
            errors: [
                message.message
            ]
        });
    }
});
exports.getDataById = getDataById;
//# sourceMappingURL=UserController.js.map