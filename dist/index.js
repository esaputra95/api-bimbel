"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routers/auth/index"));
const masters_1 = require("./routers/masters");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); // Parse JSON requests
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/auth', index_1.default);
app.use('/users', masters_1.user);
app.listen(3000, () => console.log('server run ip 127.0.0.1:3000'));
//# sourceMappingURL=index.js.map