import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    getDataSelect,
    postData,
    updateData,
    uploadImage
} from "#controllers/registers/RegisterController";
import ImageUpload from "#root/helpers/uploadImage";
const route = express.Router()

route.get('/', getData);
route.post('/',  postData);
route.post('/images', ImageUpload.single('images'), uploadImage);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.get('/select', getDataSelect);
route.get('/:id', getDataById);

export default route