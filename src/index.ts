import express from "express";
import 'module-alias/register';
import 'dotenv/config'
import bodyParser from 'body-parser';
import cors from 'cors';

import login from './routers/auth/index'

import { 
    AccessToken 
} from "./controllers/auth/middlewareController";
import { 
    classMaster,
    classType,
    user,
    Room,
    University,
    Major,
    Course,
    Material,
    Tutor,
    Student
} from "./routers/masters";
import { 
    Register,
    RegisterFromAdmin 
} from "./routers/registers";
import { 
    GuidanceType,
    Package,
    SchoolYear,
    Session 
} from "./routers/settings";
import { 
    ClassInformation,
    Schedule,
    StudyGroup,
    TentorNotAvailable
} from "./routers/schedules";
import { RecordMateri } from "./routers/recordMateri";
import { PayrollRoute } from "./routers/payroll";
import { PayrollReportRoute, RecordMateriReportRoute, StudentReportRoute } from "./routers/reports";
import { DashboardRoute } from "./routers/dashboard";

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', login)
app.use('/users', AccessToken, user)
app.use('/class-masters', AccessToken, classMaster)
app.use('/class-types', AccessToken,  classType)
// app.use('/guidance-types', AccessToken, guidanceType)
app.use('/rooms', AccessToken, Room)
app.use('/universities', AccessToken, University)
app.use('/majors', AccessToken, Major)
app.use('/courses', AccessToken, Course)
app.use('/materials', AccessToken, Material)
app.use('/registers', AccessToken, Register)
app.use('/register-admin', AccessToken, RegisterFromAdmin)
app.use('/packages', AccessToken, Package)
app.use('/guidance-types', AccessToken, GuidanceType)
app.use('/sessions', AccessToken, Session)
app.use('/school-years', AccessToken, SchoolYear)
app.use('/tutors', AccessToken, Tutor)
app.use('/schedule/tentor-not-available', AccessToken, TentorNotAvailable)
app.use('/schedule/study-groups', AccessToken, StudyGroup)
app.use('/schedule/schedules', AccessToken, Schedule)
app.use('/schedule/class-information', AccessToken, ClassInformation)
app.use('/students', AccessToken, Student)
app.use('/record-materi', AccessToken, RecordMateri)
app.use('/payrolls', AccessToken, PayrollRoute)

app.use('/report/payroll-reports', AccessToken, PayrollReportRoute)
app.use('/report/record-materi-reports', AccessToken, RecordMateriReportRoute)
app.use('/report/student-reports', AccessToken, StudentReportRoute)

app.use('/dashboard', AccessToken, DashboardRoute)

app.listen(3000, ()=> console.log('server run ip 127.0.0.1:3000'))