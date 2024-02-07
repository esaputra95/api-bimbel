import express from "express";
import { getData } from "#controllers/masters/ProfileController"
const route = express.Router()

route.get('/', getData);

export default route