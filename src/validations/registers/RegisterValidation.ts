import { body } from 'express-validator';

const classTypeValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
]

export default classTypeValidation