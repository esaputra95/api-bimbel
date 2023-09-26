"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../../controllers/auth/AuthController");
const login = express_1.default.Router();
login.post('/login', AuthController_1.Login);
exports.default = login;
//# sourceMappingURL=index.js.map