import express from "express";
import { registerUser, deleteUser, loginUser, refrestoken } from "../controllers/users.js";
import { checkMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', registerUser);
router.delete('/delete/:_id', checkMiddleware, deleteUser);
router.post('/login', loginUser);
router.post('/refreshtoken', refrestoken);

export default router;