import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData,
    updateData
} from "#controllers/registers/RegisterFromAdminController";
const route = express.Router()

route.get('/', getData);
route.post('/',  postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route