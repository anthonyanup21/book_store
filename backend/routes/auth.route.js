import { Router } from "express";
import { signup ,login,checkAuth,logout} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyJWT.js";


const router=Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/check-auth",verifyToken,checkAuth)
router.get("/logout",logout)
export default router