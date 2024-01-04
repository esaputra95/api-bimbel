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
import validationMessage from "#root/validations/Validate";
import classMasterValidation from "#root/validations/masters/ClassMasterValidation";
const route = express.Router()

route.get('/', getData);
route.post('/',  validationMessage(classMasterValidation), postData);
route.put('/:id', updateData);
route.delete('/:id', deleteData);
route.post('/data-payroll-session', getDataPayrollSession);
route.get('/payroll-detail/:id', getPayrollDetail);
route.get('/:id', getDataById);

export default route