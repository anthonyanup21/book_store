import jwt from "jsonwebtoken"
import {logout} from "../controllers/auth.controller.js"

const verifyToken=(req,res,next)=>{
    try {
        const token=req.cookies?.jwt
        if(!token) return res.status(400).json({status:false,message:"unauthorized"})
        const decoded=jwt.verify(token,process.env.SECRET)
        if(!decoded) return res.status(400).json({status:false,message:"unauthorized"})
        req.userId=decoded.id
        next()
    } catch (error) {
        console.log("error in verifyToken controller (invalid token)",error)
        logout()
        
    }
}
export default verifyToken