import express from "express";
import { deleteData, getData, getDataById, postData, updateData } from "#controllers/masters/UserController"
import  userDataValidateSchemaBased from "#root/validations/masters/UserValidation";
import validationMessage from "#root/validations/Validate";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(userDataValidateSchemaBased), postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/:id', getDataById);

export default route