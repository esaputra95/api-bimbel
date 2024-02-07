import express from "express";
import { excelToJson } from "#controllers/settings/ExelToJson"
const route = express.Router()

route.get('/', excelToJson);

export default route