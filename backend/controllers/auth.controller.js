import User from "../models/user.model.js"
import hashPassword from "../utils/hashPassword.js"
import comparePassword from "../utils/comparePassword.js"
import token from "../utils/generateJWT.js"
export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const userAlredayExist =await  User.findOne({ email })

        if (userAlredayExist) return res.status(400).json({ success: false, message: "User alreday exist" })
        const hashedPassword=await hashPassword(password)
        
            const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })
        await token(res,newUser._id)

        await newUser.save()

        res.status(200).json({success:true,user:{...newUser._doc,password:null}})
    } catch (error) {
        console.log("error in signup controller", error)
        res.status(500).json({ success: false, message: "something went wrong" })

    }
}

export const login =async (req,res)=>{

    try {
        const {email,password}=req.body
        const userExist=await User.findOne({email})
        if(!userExist) return res.status(400).json({success:false,message:"invalid credantials"})
        const correctPassword=await comparePassword(password,userExist.password)
        if(!correctPassword) return res.status(400).json({success:false,message:"invalid credantials"})
        await token(res,userExist._id)
        res.status(200).json({success:true,user:{...userExist._doc,password:null}})
        
    } catch (error) {
        console.log("error in login controller",error)
        res.status(500).json({success:false,message:"something went wrong"})
        
    }
}
export const logout=(req,res)=>{
    try {
        res?.clearCookie("jwt")
        res.status(200).json({success:true,message:"Logged out"})
        
    } catch (error) {
        console.log("error in logout controller",error)
        res.status(500).json({success:false,message:"internal server error"})
        
    }
}

export const checkAuth=async (req,res)=>{
    try {
        const id=req.userId

        const user=await User.findById(id).select("-password")
        if(!user) return res.status(400).json({success:false,message:"invalid user"})
        res.status(200).json({success:true,user})
    } catch (error) {
        console.log("error in check auth controller",error)
        res.status(500).json({ success: false, message: "internal server error" })


        
    }
    
}