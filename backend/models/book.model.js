import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    genre: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    averageRating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

}, { timestamps: true })

const bookModel = mongoose.model("Book", bookSchema)

export default bookModel