import express from "express";
import { getUsers, getUser, register, login } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUser);

export default router;