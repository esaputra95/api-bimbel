import { body } from 'express-validator';

const classMasterValidation = [
    body("basicSalary")
        .exists({ checkFalsy: true })
        .withMessage("Basic Salary is required"),
    body("sessionSalary")
        .exists({ checkFalsy: true })
        .withMessage("Session Salary is required"),
]

export default classMasterValidation