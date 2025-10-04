import express from "express"
import connectDB from "./db/connectDB.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import bookRoute from "./routes/book.route.js"
import reviewRoute from "./routes/review.route.js"
import cors from "cors"
dotenv.config()


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/book", bookRoute)
app.use("/api/review", reviewRoute)



connectDB().then(() => {
    app.listen(3000, () => {
        console.log("server started at port 3000")
    })
})


