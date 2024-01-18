import { body } from 'express-validator';

const classMasterValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("name is required"),
    body("quantity")
        .exists({ checkFalsy: true })
        .withMessage("quantity is required"),
    body("price")
        .exists({ checkFalsy: true })
        .withMessage("price is required"),
    body("classTypeId")
        .exists({ checkFalsy: true })
        .withMessage("classTypeId is required"),
]

export default classMasterValidation