"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../../controllers/masters/UserController");
const UserValidation_1 = __importDefault(require("../../validations/masters/UserValidation"));
const Validate_1 = __importDefault(require("../../validations/Validate"));
const login = express_1.default.Router();
login.get('/', UserController_1.getData);
login.post('/', (0, Validate_1.default)(UserValidation_1.default), UserController_1.postData);
login.put('/:id', UserController_1.updateData);
login.delete('/:id', UserController_1.deleteData);
login.get('/:id', UserController_1.getDataById);
exports.default = login;
//# sourceMappingURL=UserRoute.js.map