import express from "express";
import { getSetting, updateData, updateIcon, uploadImage } from "#controllers/settings/SettingController"
import ImageUpload from "#root/helpers/uploadImage";
const route = express.Router()

route.get('/', getSetting);
route.post('/', updateData);
route.put('/', updateIcon);
route.post('/images', ImageUpload.single('images'), uploadImage);

export default route