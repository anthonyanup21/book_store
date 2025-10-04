import { create } from "zustand"
import axiosInstance from "../axios/axiosInstance.js"
import toast from "react-hot-toast"
import reviewStore from "./reviewStore.js"

const bookStore = create((set, get) => ({
    allBooks: [],
    selectedBook: null,
    isGettingBooks: false,
    createdBooks: [],
    changeSelectedBook: async (book) => {
        set({ selectedBook: book })

    },
    getAllBooks: async () => {
        try {
            set({ isGettingBooks: true })
            const res = await axiosInstance.get("/book/all-books")
            set({ allBooks: res.data.books })
        } catch (error) {
            console.log("error in getAllBooks store", error)
            toast.error(error.response?.data?.message || "Something went wrong")


        } finally {
            set({ isGettingBooks: false })

        }

    },
    addBook: async (formData) => {
        try {
            const res = await axiosInstance.post("/book/create-book", { ...formData })
            set({ allBooks: [...get().allBooks, res.data.book] })
            toast.success("Book added")


        } catch (error) {
            console.log("error in getAllBooks store", error)
            toast.error(error.response?.data?.message || "Something went wrong")


        }

    },
    getCreatedBook: async () => {
        try {
            set({ isGettingBooks: true })
            const res = await axiosInstance.get("/book/get-created-books")
            set({ createdBooks: res.data.books })


        } catch (error) {
            console.log("error in getCreatedBook store", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        } finally {
            set({ isGettingBooks: false })

        }
    },
    deleteBook: async (id) => {
        try {
            const { postedReviews } = reviewStore.getState()
            const res = await axiosInstance.delete(`/book/delete-book/${id}`)
            set({ createdBooks: [...get().createdBooks.filter((book) => book._id != id)] })
            const deletedReviews = res.data.deletedReviews
            const deletedIds = deletedReviews.map(review => review._id)
            reviewStore.setState({ postedReviews: postedReviews.filter((review) => !deletedIds.includes(review._id)) })
            toast.success("Book deleted")

        } catch (error) {
            console.log("error in deleteBook store", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        }
    },
    updateBook: async (formData, id) => {
        try {
            const res = await axiosInstance.put(`/book/update-book/${id}`, formData)
            set((state) => ({
                createdBooks: state.createdBooks.map((book) =>
                    book._id === id ? res.data.book : book
                ),
            }))
            toast.success("book updated")

        } catch (error) {
            console.log("error in updateBook store", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        }
    },
    search: async (word) => {
        try {
            set({ isGettingBooks: true })
            const res = await axiosInstance.post("/book/search", { word })
            set({ allBooks: res.data.books })

        } catch (error) {
            console.log("error in search store", error)
            toast.error(error.response?.data?.message || "Something went wrong")

        } finally {
            set({ isGettingBooks: false })

        }

    }

}))
export default bookStore