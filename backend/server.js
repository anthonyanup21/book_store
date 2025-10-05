import express from "express";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import bookRoute from "./routes/book.route.js";
import reviewRoute from "./routes/review.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// ✅ CORS only for development
if (process.env.ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ API routes
app.use("/api/auth", authRoute);
app.use("/api/book", bookRoute);
app.use("/api/review", reviewRoute);

// ✅ Serve frontend only in production
if (process.env.ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // ⚠️ Use "*" not /.*/ — more reliable for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server started at port ${PORT}`);
  });
});
