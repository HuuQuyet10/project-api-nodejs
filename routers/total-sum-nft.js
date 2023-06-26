import express from "express";
import { sortDateDashboard, totalSum } from "../controllers/total-sum.js";
import { checkMiddleware } from "../middleware/auth.js";
const router = express.Router();

// GET ALL NFT
router.get('/', checkMiddleware , totalSum);

router.get('/get-sort-dashboard', checkMiddleware, sortDateDashboard);

export default router;