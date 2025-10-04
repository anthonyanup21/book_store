import Book from "../models/book.model.js";
import Review from "../models/review.model.js";


export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({ success: true, books })



    } catch (error) {

        console.log("error in getAllBooks controller", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }
}

export const createBook = async (req, res) => {
    try {
        const { title, author, description, genre, year } = req.body
        const book=await Book.findOne({title})
        if (book) return res.status(400).json({success:false,message:"book with this title alreday exist"})
        const postedBy = req.userId
        const newBook = new Book({
            title,
            author,
            description,
            genre,
            year,
            postedBy,
            averageRating: 0
        })
        await newBook.save()
        res.status(200).json({ success: true, book: newBook })

    } catch (error) {
        console.log("error in create book controller", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }
}
export const deleteBook = async (req, res) => {
    try {
        const { id: bookId } = req.params
        const deletedBook = await Book.findByIdAndDelete(bookId)
        await Review.deleteMany({ bookId })
        res.status(200).json({ success: true, deletedBook, deletedReviews: deletedBook.reviews })

    } catch (error) {
        console.log("error in deleteBook controller", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }

}

export const updateBook = async (req, res) => {
    try {
        const { id: bookId } = req.params

        const { userId } = req
        const { title, author, description, genre, year } = req.body
        console.log("title", title)
        console.log("author", author)
        console.log("description", description)
        const book = await Book.findById(bookId)
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });
        if (book.postedBy != userId) return res.status(400).json({ success: false, message: "not authorized to update message" })
        book.title = title
        book.author = author
        book.description = description
        book.genre = genre
        book.year = year
        await book.save()
        res.status(200).json({ success: true, book })

    } catch (error) {
        console.log("error in updateBook controller", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }

}

export const createdBooks = async (req, res) => {
    try {
        const { userId } = req
        const books = await Book.find({ postedBy: userId })
        res.status(200).json({ success: true, books })


    } catch (error) {
        console.log("error in createdBooks controller", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }
}

export const search = async (req, res) => {
    try {
        const {word} = req.body
        if (word.length>0) {
            const books = await Book.find({
                title: { $regex: `^${word}`, $options: "i" } 
            });
            res.status(200).json({success:true,books})

        }else{
            const books=await Book.find()
            res.status(200).json({success:true,books})
        }


    } catch (error) {
        console.log("error in createdBooks search", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }
}

