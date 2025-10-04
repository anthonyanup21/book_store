import bcrypt from "bcrypt"

const comparePassword=async (password,hashedPassword)=>{
    const correctPassword=await bcrypt.compare(password,hashedPassword)
    return comparePassword
}

export default comparePassword