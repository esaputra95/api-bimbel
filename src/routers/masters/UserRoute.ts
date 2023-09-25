import express from "express";
import { deleteData, getData, getDataById, postData, updateData } from "#controllers/masters/UserController"
import  userDataValidateSchemaBased from "#root/validations/masters/UserValidation";
import validationMessage from "#root/validations/Validate";
const login = express.Router()

login.get('/', getData);
login.post('/',  validationMessage(userDataValidateSchemaBased), postData);
login.put('/:id', updateData);
login.delete('/:id', deleteData);
login.get('/:id', getDataById);

export default login