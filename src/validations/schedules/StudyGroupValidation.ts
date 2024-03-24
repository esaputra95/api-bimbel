import { body } from 'express-validator';

const studyGroupValidation = [
    body("studyGroup.name")
        .exists({ checkNull: true }).withMessage("Name is required")
        .isString().withMessage("Name should be string"),
    body("studyGroup.classId")
        .exists({ checkNull: true }).withMessage("Class is required")
        .isString().withMessage("Class should be string"),
    body("studyGroup.total")
        .exists({checkFalsy: true}).withMessage('Total is Required')
        .isNumeric().withMessage('Total must Number')

]

export default studyGroupValidation