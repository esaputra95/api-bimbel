import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    getListStudent,
    getStudyGroup,
    postData,
    updateData
} from "#controllers/recordMateri/RecordMateriController"

const route = express.Router()

route.get('/', getData);
route.post('/', postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/get-study-group', getStudyGroup);
route.post('/get-list-student', getListStudent);
route.get('/:id', getDataById);

export default route