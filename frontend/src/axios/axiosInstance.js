import axios from "axios"
const BASE_URL=import.meta.env.ENV!="development"?"/api":"http://localhost:3000/api"
const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

export default axiosInstance