import express from "express";
import {
    getRecordMateri,
    getStudyGroup
} from "#root/controllers/dashboard/DashboardController"
const route = express.Router()

route.get('/record-materi', getRecordMateri);
route.get('/study-group', getStudyGroup);

export default route