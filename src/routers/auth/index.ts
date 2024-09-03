import express from "express";
import { ForgotPassword, Login } from "#controllers/auth/AuthController"
const login = express.Router()

login.post('/login', Login);
login.post('/forgot-password', ForgotPassword);

export default login