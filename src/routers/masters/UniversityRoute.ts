import express from "express";
import { deleteData, getData, getDataById, postData, updateData, getDataSelect } from "#controllers/masters/UniversityController"
import validationMessage from "#root/validations/Validate";
import UniversityValidation from "#root/validations/masters/UniversityValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(UniversityValidation), postData);
route.put('/:id', validationMessage(UniversityValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route