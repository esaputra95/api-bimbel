import express from "express";
import {
    deleteData,
    getData,
    getDataById,
    getDataPayrollSession,
    getPayrollDetail,
    postData,
    updateData
} from "#controllers/payrolls/PayrollController"
const route = express.Router()

route.get('/', getData);
route.post('/', postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.post('/data-payroll-session', getDataPayrollSession);
route.get('/payroll-detail/:id', getPayrollDetail);
route.get('/:id', getDataById);

export default route