import express from "express";
import { deleteData, getData, getDataById, getDataSelect, postData, updateData } from "#controllers/settings/GuidanceTypeController"
import validationMessage from "#root/validations/Validate";
import GuidanceTypeValidation from "#root/validations/settings/GuidanceTypeValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(GuidanceTypeValidation), postData);
route.put('/:id', validationMessage(GuidanceTypeValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route