import express from "express"
import {UserLogin , UserRegister,UserLogout, isLoggedIn} from "../controllers/auth.controllers.js"
import { VerifyJWT } from "../middlewares/auth.middleware.js"
const router = express.Router()


router.route("/register").post(UserRegister)
router.route("/login").post(UserLogin)
router.route("/logout").post(UserLogout)

router.route("/isLoggedIn").get(isLoggedIn)



export default router