import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData,
    updateData,
    getDataSelectSchedule
} from "#controllers/masters/TutorController"
import validationMessage from "#root/validations/Validate";
import TutorTypeValidation from "#root/validations/masters/TutorValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(TutorTypeValidation), postData);
route.put('/:id', validationMessage(TutorTypeValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/select-schedule', getDataSelectSchedule);
route.get('/:id', getDataById);

export default route