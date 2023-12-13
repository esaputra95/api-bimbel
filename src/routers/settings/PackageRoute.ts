import express from "express";
import { deleteData, getData, getDataById, getDataSelect, postData, updateData } from "#controllers/settings/PackageController"
import validationMessage from "#root/validations/Validate";
import PackageValidation from "#root/validations/settings/PackageValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(PackageValidation), postData);
route.put('/:id', validationMessage(PackageValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route