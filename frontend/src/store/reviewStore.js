import axios from "axios"
import { create } from "zustand"
import axiosInstance from "../axios/axiosInstance.js"
import bookStore from "./bookStore.js"
import toast from "react-hot-toast"

const reviewStore = create((set, get) => ({
    reviews: [],
    gettingReviews: false,
    postedReviews: [],
    getAllReviews: async (id) => {
        try {
            console.log("hello world")
            set({ gettingReviews: true })
            const res = await axiosInstance.get(`/review/all-reviews/${id}`)
            console.log(res.data.reviews)
            set({ reviews: res.data.reviews })
        } catch (error) {
            console.log("error in getAllReviews store", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        } finally {
            set({ gettingReviews: false })
        }
    },
    addReview: async (rating, reviewText) => {
        try {
            const { selectedBook } = bookStore.getState()
            const res = await axiosInstance.post(`/review/post-review/${selectedBook._id}`, { rating, reviewText })
            set({ reviews: [...get().reviews, res.data.review] })
            bookStore.setState({ selectedBook: res.data.book })
            toast.success("Review Posted")

        } catch (error) {
            console.log("error in addReview store", error)
            toast.error(error.response?.data?.message || "Something went wrong")


        }

    },
    getPostedReviews: async () => {
        try {
            set({ gettingReviews: true })
            const res = await axiosInstance.get("/review/get-posted-reviews")
            set({ postedReviews: res.data.reviews })

        } catch (error) {
            console.log("error in addReview store", error)
            toast.error(error.response?.data?.message || "Something went wrong")


        } finally {
            set({ gettingReviews: false })

        }
    },
    deleteReview: async (id) => {
        try {
            const res=await axiosInstance.delete(`/review/delete-review/${id}`)
            set({postedReviews:[...get().postedReviews.filter((review)=>review._id!=id)]})
            toast.success("Review deleted")
        } catch (error) {
            console.log("error in deleteReview store", error)
            toast.error(error.response?.data?.message || "Something went wrong")
            
        }
     },
    updateReview:async(formData,id)=>{
        try {
            const res=await axiosInstance.put(`/review/update-review/${id}`,formData)
            set((state) => ({
                postedReviews: state.postedReviews.map((review) =>
                    review._id === id ? res.data.review : review
                ),
            }))
            

            toast.success("review updated")
            
        } catch (error) {
            console.log("error in updateReview store", error)
            toast.error(error.response?.data?.message || "Something went wrong")
            
        }
    }
}))

export default reviewStore