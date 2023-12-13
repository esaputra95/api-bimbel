import express from "express";
import { deleteData, getData, getDataById, getDataSelect, postData, updateData } from "#controllers/masters/ClassTypeController"
import validationMessage from "#root/validations/Validate";
import classTypeValidation from "#root/validations/masters/ClassTypeValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(classTypeValidation), postData);
route.put('/:id', validationMessage(classTypeValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route