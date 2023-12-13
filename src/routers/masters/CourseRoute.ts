import express from "express";
import { deleteData, getData, getDataById, postData, updateData, getDataSelect } from "#controllers/masters/CourseController"
import validationMessage from "#root/validations/Validate";
import CourseValidation from "#root/validations/masters/CourseValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(CourseValidation), postData);
route.put('/:id', validationMessage(CourseValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route