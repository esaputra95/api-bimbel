import { body } from 'express-validator';

const SchoolYearValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
    body("startYear")
        .exists({ checkFalsy: true })
        .withMessage("Start Year is required"),
    body("endYear")
        .exists({ checkFalsy: true })
        .withMessage("End Year is required")
]

export default SchoolYearValidation