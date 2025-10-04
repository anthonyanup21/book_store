import axios from "axios"
const BASE_URL=process.env.ENV=="production"?"/api":"http://localhost:3000/api"
const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

export default axiosInstance