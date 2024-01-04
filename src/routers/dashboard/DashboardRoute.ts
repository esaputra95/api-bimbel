import express from "express";
import {
    getRecordMateri
} from "#root/controllers/dashboard/DashboardController"
const route = express.Router()

route.get('/record-materi', getRecordMateri);

export default route