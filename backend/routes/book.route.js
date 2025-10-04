import {Router} from "express"
import verifyToken from "../middlewares/verifyJWT.js"
import { createBook,getAllBooks,createdBooks, deleteBook, updateBook, search } from "../controllers/book.controller.js"
const router=Router()

router.post("/create-book",verifyToken,createBook)
router.get("/all-books",getAllBooks)
router.get("/get-created-books",verifyToken,createdBooks)
router.delete("/delete-book/:id",verifyToken,deleteBook)
router.put("/update-book/:id",verifyToken,updateBook)
router.post("/search",search)




export default router