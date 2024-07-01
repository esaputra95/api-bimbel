import express from "express";
import 'module-alias/register';
import 'dotenv/config'
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'

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
    Student,
    Profile
} from "./routers/masters";
import { 
    Register,
    RegisterFromAdmin 
} from "./routers/registers";
import { 
    ExcelToJson,
    GuidanceType,
    Package,
    SchoolYear,
    Session, 
    Setting
} from "./routers/settings";
import { 
    ClassInformation,
    Schedule,
    StudyGroup,
    TentorNotAvailable
} from "./routers/schedules";
import { RecordMateri } from "./routers/recordMateri";
import { PayrollRoute } from "./routers/payroll";
import { 
    PayrollReportRoute,
    RecordMateriReportRoute,
    RegisterReportController,
    ScheduleReportController,
    StudentReportRoute
} from "./routers/reports";
import { DashboardRoute } from "./routers/dashboard";
import { sendEmail } from "./controllers/helper/SendEmailController";

const app = express()

const allowedOrigins = [
    'http://localhost:5174',
    'http://localhost:5173',
    'https://app.espbimbel.com',
    'https://app.espbimbel.com/',
    'http://app.espbimbel.com',
    'http://app.espbimbel.com/',
];

const corsOptions = {
    origin: function(origin:any, callback:any) {
        // Periksa apakah origin ada dalam daftar asal yang diizinkan
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Izinkan akses
        } else {
            callback(new Error('Origin not allowed by CORS')); // Tolak akses
        }
    }
};

  // Gunakan middleware CORS
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', login)
app.use('/excel', ExcelToJson)
app.use('/users', AccessToken, user)
app.use('/profiles', AccessToken, Profile)
app.use('/class-masters', AccessToken, classMaster)
app.use('/class-types', AccessToken,  classType)
// app.use('/guidance-types', AccessToken, guidanceType)
app.use('/rooms', AccessToken, Room)
app.use('/universities', AccessToken, University)
app.use('/majors', AccessToken, Major)
app.use('/courses', AccessToken, Course)
app.use('/materials', AccessToken, Material)
app.use('/registers', Register)
app.use('/register-admin', AccessToken, RegisterFromAdmin)
app.use('/packages', AccessToken, Package)
app.use('/guidance-types', AccessToken, GuidanceType)
app.use('/sessions', AccessToken, Session)
app.use('/settings', AccessToken, Setting)
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
app.use('/report/schedule-reports', AccessToken, ScheduleReportController)
app.use('/report/register-reports', AccessToken, RegisterReportController)
app.post('/send-email', sendEmail)

// app.use(express.static('public')); 
// app.use('/images', express.static('src/images'));
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/images', express.static(path.join(__dirname, '/public')))

app.use('/dashboard', AccessToken, DashboardRoute)

app.listen(3001, ()=> console.log('server run ip 127.0.0.1:3000'))