import express from "express";
import { Login } from "#controllers/auth/AuthController"
const login = express.Router()

login.post('/login', Login);

export default login