import express from "express";
import { deleteData, getData, getDataById, postData, updateData } from "#controllers/schedules/TentorNotAvailableController"
import validationMessage from "#root/validations/Validate";
// import TentorNotAvailableValidation from "#root/validations/masters/TentorNotAvailableValidation";
const route = express.Router()

route.get('/', getData);
route.post('/', postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/:id', getDataById);

export default route