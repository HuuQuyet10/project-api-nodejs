import express from "express";
import { totalSum } from "../controllers/total-sum.js";
import { checkMiddleware } from "../middleware/auth.js";
const router = express.Router();

// GET ALL NFT
router.get('/', checkMiddleware , totalSum);

export default router;