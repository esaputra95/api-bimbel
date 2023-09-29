import { body } from 'express-validator';

const guidanceTypeValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
    body("total")
        .isNumeric()
        .withMessage('Total is numeric')
]

export default guidanceTypeValidation