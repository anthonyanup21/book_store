import Review from "../models/review.model.js";
import Book from "../models/book.model.js"
import User from "../models/user.model.js"

export const postReview = async (req, res) => {

    try {
        const { id: bookId } = req.params
        const { userId } = req
        const { rating, reviewText } = req.body
        const isReviewAlredayPosted = await Review.findOne({ bookId, userId })
        if (isReviewAlredayPosted) return res.status(400).json({ success: false, message: "review alreday posted" })
        const user = await User.findById(userId)
        const newReview = new Review({
            bookId,
            userId,
            rating,
            reviewText,
            userName: user.fullName
        })
        await newReview.save()
        const book = await Book.findById(bookId)
        book.reviews.push(newReview._id)

        const averageRating = ((book.averageRating * (book.reviews.length - 1)) + rating) / book.reviews.length;
        console.log(averageRating)
        book.averageRating = averageRating

        await book.save()
        res.status(200).json({ success: true, review: newReview, book })

    } catch (error) {

        console.log("error in postReview controller", error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
export const deleteReview = async (req, res) => {
    try {
        const { id: reviewId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(400).json({ success: false, message: "Invalid review ID" });
        }

        const book = await Book.findById(deletedReview.bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Remove review from book's reviews array
        book.reviews = book.reviews.filter((review) => review.toString() !== reviewId);

        // Recalculate average rating
        if (book.reviews.length === 0) {
            book.averageRating = 0;
        } else {
            book.averageRating =
                (book.averageRating * (book.reviews.length + 1) - deletedReview.rating) /
                book.reviews.length;
        }

        await book.save();

        res.status(200).json({ success: true, deletedReview, book });
    } catch (error) {
        console.log("error in deleteReview controller", error);
        res.status(500).json({ success: false, message: "internal server error" });
    }
}

export const updateReview = async (req, res) => {
    try {
        const { id: reviewId } = req.params;
        const { rating, reviewText } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        const book = await Book.findById(review.bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Prevent division by zero just in case
        if (book.reviews.length === 0) {
            book.averageRating = rating;
        } else {
            const totalRating = book.averageRating * book.reviews.length;
            const updatedAverageRating = ((totalRating - review.rating) + rating) / book.reviews.length;
            book.averageRating = updatedAverageRating;
        }

        await book.save();

        // Update review fields
        review.rating = rating;
        review.reviewText = reviewText;
        await review.save();

        res.status(200).json({ success: true, review, book });
    } catch (error) {
        console.log("error in updateReview controller", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const allReviews = async (req, res) => {
    try {
        const { id: bookId } = req.params
        const reviews = await Review.find({ bookId })
        res.status(200).json({ success: false, reviews })
    } catch (error) {
        console.log("error in allReviews controller", error)
        res.status(500).json({ success: false, message: "internal server error" })


    }
}

export const postedReviews = async (req, res) => {
    try {
        const { userId } = req
        const reviews = await Review.find({ userId })
        res.status(200).json({ success: true, reviews })

    } catch (error) {
        console.log("error in postedReviews controller", error)
        res.status(500).json({ success: false, message: "internal server error" })

    }
}