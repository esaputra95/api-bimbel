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
exports.Login = void 0;
const PrismaService_1 = __importDefault(require("../../services/PrismaService"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const user = yield PrismaService_1.default.users.findFirst({
            where: {
                username: data.username
            }
        });
        if (!user)
            throw new Error('Username or password incorrect');
        const match = yield (0, bcryptjs_1.compare)(data.password, user.password);
        if (!match)
            res.status(401).json({ message: "Wrong username or password" });
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: user.id,
            username: user.username,
            name: user.name
        }, '1234567890');
        res.json({
            token: accessToken
        });
    }
    catch (error) {
        res.status(404).json({
            message: `${error}`
        });
    }
});
exports.Login = Login;
//# sourceMappingURL=AuthController.js.map