import { body } from 'express-validator';

const UserValidation = [
    body("username")
        .exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isString()
        .withMessage("User name should be string"),
    body("name").exists({ checkFalsy: true })
        .withMessage("User name is required")
        .isString()
        .withMessage("User name should be string")
]

export default UserValidation