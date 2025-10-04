import { Router } from "express";
import { postReview,allReviews,postedReviews, deleteReview, updateReview } from "../controllers/review.controller.js";
import verifyToken from "../middlewares/verifyJWT.js";

const router=Router()
router.post("/post-review/:id",verifyToken,postReview)
router.get("/all-reviews/:id",allReviews)
router.get("/get-posted-reviews",verifyToken,postedReviews)
router.delete("/delete-review/:id",verifyToken,deleteReview)
router.put("/update-review/:id",verifyToken,updateReview)





export default router