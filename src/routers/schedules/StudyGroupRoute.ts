import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    postData,
    updateData,
    getDataSelect
} from "#root/controllers/schedules/StudyGroupController"
import validationMessage from "#root/validations/Validate";
import studyGroupValidation from "#root/validations/schedules//StudyGroupValidation";
const route = express.Router()

route.get('/', getData);
route.post('/', validationMessage(studyGroupValidation),postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route