import { getData } from "#root/controllers/reports/PayrollReportController";
import express from "express";

const route = express.Router()

route.post('/', getData);

export default route