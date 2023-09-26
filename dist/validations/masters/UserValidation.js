"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const UserValidation = [
    (0, express_validator_1.body)("username")
        .exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isString()
        .withMessage("User name should be string"),
    (0, express_validator_1.body)("name").exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isString()
        .withMessage("User name should be string")
];
exports.default = UserValidation;
//# sourceMappingURL=UserValidation.js.map