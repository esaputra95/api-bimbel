import { body } from 'express-validator';

const MajorValidation = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required")
        .isString()
        .withMessage("Name should be string"),
    body("universityId")
        .exists({ checkFalsy: true })
        .withMessage("University is required")

]

export default MajorValidation