import express from "express";
import { Login, forgotPassword } from "#controllers/auth/AuthController"
const login = express.Router()

login.post('/login', Login);
login.post('/forgot-password', forgotPassword);

export default login