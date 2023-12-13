import express from "express";
import { deleteData, getData, getDataById, getDataSelect, postData, updateData } from "#controllers/settings/SchoolYearController"
import validationMessage from "#root/validations/Validate";
import SchoolYearValidation from "#root/validations/settings/SchoolYearValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(SchoolYearValidation), postData);
route.put('/:id', validationMessage(SchoolYearValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route