import express from "express";
import { deleteData, getData, getDataById, getDataSelect, postData, updateData } from "#controllers/masters/ClassController"
import validationMessage from "#root/validations/Validate";
import classMasterValidation from "#root/validations/masters/ClassMasterValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(classMasterValidation), postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route