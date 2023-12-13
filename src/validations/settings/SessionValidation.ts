import { body } from 'express-validator';

const SessionValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
    body("quantity")
        .exists({ checkFalsy: true })
        .withMessage("Quantity is required")
        .isNumeric()
        .withMessage("Name should be Numeric"),
]

export default SessionValidation