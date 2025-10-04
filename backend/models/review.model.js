import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName:{
        type: String,
        required: true

    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5
    },
    reviewText: {
        type: String,
        required: true
    }
})

const Review = mongoose.model("review", reviewSchema)

export default Review