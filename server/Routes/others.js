import express from "express"
import { userProfile } from "../Controllers/User.js"



const router = express.Router()

router.get('/profile',userProfile)


export default router