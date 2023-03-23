import express from "express"
import { login, register, userProfile } from "../Controllers/User.js"



const router = express.Router()

router.post('/register',register)
router.post("/login",login)


export default router