import express from "express";
import { getDataSelect } from "#controllers/masters/StudentController"
const route = express.Router()

route.get('/select', getDataSelect);

export default route