import express from "express";
import { deleteData, getData, getDataById, postData, updateData } from "#controllers/masters/GuidanceTypeController"
import validationMessage from "#root/validations/Validate";
import guidanceTypeValidation from "#root/validations/masters/GuidanceTypeValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(guidanceTypeValidation), postData);
route.put('/:id', validationMessage(guidanceTypeValidation), updateData);
route.delete('/:id', deleteData);
route.get('/:id', getDataById);

export default route