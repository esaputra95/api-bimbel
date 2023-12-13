import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    postData,
    updateData,
    getDataSelect,
    checkSchedule,
    cancelSchedule
} from "#root/controllers/schedules/ScheduleController"
const route = express.Router()

route.get('/', getData);
route.post('/', postData);
route.post('/cancel-schedule', cancelSchedule);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.post('/check-schedule/', checkSchedule);
route.get('/:id', getDataById);

export default route