import express from "express";
import { deleteData, getData, getDataById, getDataSelect, postData, updateData } from "#controllers/settings/SessionController"
import validationMessage from "#root/validations/Validate";
import SessionValidation from "#root/validations/settings/SessionValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(SessionValidation), postData);
route.put('/:id', validationMessage(SessionValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route