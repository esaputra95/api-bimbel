import express from "express";
import {
    getData
} from "#root/controllers/schedules/ClassInformationController"
const route = express.Router()

route.post('/', getData);
export default route