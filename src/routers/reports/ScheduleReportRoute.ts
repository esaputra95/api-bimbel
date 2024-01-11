import { getData } from "#root/controllers/reports/ScheduleReportController";
import express from "express";

const route = express.Router()

route.post('/', getData);

export default route