import jwt from "jsonwebtoken"

const token = (res, id) => {
    try {
        const token=jwt.sign({id},process.env.SECRET,{expiresIn:"1d"})
        res.cookie("jwt",token,{maxAge:7*24*60*60*1000})
        
    } catch (error) {
        console.log("error while generating jwt token",error)

    }
}
export default token