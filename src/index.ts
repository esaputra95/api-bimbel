import express, { Request, Response } from "express";
import 'module-alias/register';
import path from 'path';
import 'dotenv/config'
import bodyParser from 'body-parser';

import login from './routers/auth/index'
import { user } from "./routers/masters";

const app = express()
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', login)
app.use('/users', user)

app.listen(1234, ()=> console.log('server run ip 1234ß'))