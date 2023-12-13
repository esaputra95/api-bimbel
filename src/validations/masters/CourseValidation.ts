import { body } from 'express-validator';

const CourseValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
    body("majorId")
        .exists({ checkFalsy: true })
        .withMessage("Major is required")
]

export default CourseValidation