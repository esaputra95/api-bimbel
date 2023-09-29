import express from "express";
import 'module-alias/register';
import 'dotenv/config'
import bodyParser from 'body-parser';

import login from './routers/auth/index'
import { classMaster, classType, user, guidanceType } from "./routers/masters";
import { AccessToken } from "./controllers/auth/middlewareController";

const app = express()
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', login)
app.use('/users', AccessToken, user)
app.use('/class-masters', AccessToken, classMaster)
app.use('/class-types', AccessToken, classType)
app.use('/guidance-types', AccessToken, guidanceType)

app.listen(3000, ()=> console.log('server run ip 127.0.0.1:3000'))