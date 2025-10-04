import { create } from "zustand"
import axiosInstance from "../axios/axiosInstance.js"
import toast from "react-hot-toast"
const authStore = create((set) => ({
    user: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: false,
    login: async(email, password) => {
        try {
            set({ isLoggingIn: true })
            const res =await  axiosInstance.post("/auth/login", { email, password })
            set({ user: res.data.user })
            toast.success("Welcome Back")

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.log("error in login store", error)


        } finally {
            set({ isLoggingIn: false })
        }

    },
    signup:async (fullName, email, password) => {
        try {
            set({ isSigningUp: true })
            const res = await axiosInstance.post("/auth/signup", { fullName, email, password })
            set({ user: res.data.user })
            toast.success("Welcome")
        } catch (error) {
            console.log("error in signup store", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        } finally {
            set({ isSigningUp: false })
        }

    },
    logout:async () => {
        try {
            await axiosInstance.get("/auth/logout")
            set({user:null})
            toast.success("Logged out")

        } catch (error) {
            console.log("error in logout store", error)
            toast.error(error.response?.data?.message || "Something went wrong")


        }

    },
    checkAuth:async () => {
        try {
            set({ isCheckingAuth: true })
            const res =await  axiosInstance.get("/auth/check-auth")
            set({ user: res.data.user })

        } catch (error) {
            console.log("error in check auth store", error)
            set({user:null})

        } finally {
            set({ isCheckingAuth: false })
        }

    }

}))

export default authStore