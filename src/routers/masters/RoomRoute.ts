import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData,
    updateData
} from "#controllers/masters/RoomController"
import validationMessage from "#root/validations/Validate";
import RoomValidation from "#root/validations/masters/RoomValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(RoomValidation), postData);
route.put('/:id', validationMessage(RoomValidation), updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route