import { body } from 'express-validator';

const MaterialValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
    body("courseId")
        .exists({ checkFalsy: true })
        .withMessage("Course is required")

]

export default MaterialValidation