import express from "express";
import {
    deleteData, 
    getDataById,
    getData,
    getDataSelect,
    getDataSelectAll,
    postData,
    updateData
} from "#controllers/masters/StudentController"
const route = express.Router()

route.get('/', getData);
route.post('/', postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/select-all', getDataSelectAll);
route.get('/:id', getDataById);

export default route