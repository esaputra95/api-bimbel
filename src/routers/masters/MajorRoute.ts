import express from "express";
import { deleteData, getData, getDataById, postData, updateData, getDataSelect } from "#controllers/masters/MajorController"
import validationMessage from "#root/validations/Validate";
import MajorValidation from "#root/validations/masters/MajorValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(MajorValidation), postData);
route.put('/:id', validationMessage(MajorValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route