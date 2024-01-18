import express from "express";
import {
    getRecordMateri,
    getStudyGroup,
    getStudyModule,
    getTotal,
    getStudySchedule,
    getStudentWillFinish
} from "#root/controllers/dashboard/DashboardController"
const route = express.Router()

route.get('/record-materi', getRecordMateri);
route.get('/study-group', getStudyGroup);
route.get('/study-module', getStudyModule);
route.get('/study-schedule', getStudySchedule);
route.get('/study-finish', getStudentWillFinish);
route.get('/total', getTotal);

export default route