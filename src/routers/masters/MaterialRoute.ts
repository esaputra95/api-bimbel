import express from "express";
import { deleteData, getData, getDataById, postData, updateData, getDataSelect } from "#controllers/masters/MaterialController"
import validationMessage from "#root/validations/Validate";
import MaterialValidation from "#root/validations/masters/MaterialValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(MaterialValidation), postData);
route.put('/:id', validationMessage(MaterialValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route