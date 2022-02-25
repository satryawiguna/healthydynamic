import express from "express";
import {
  register,
  login,
  logout,
  isAuth,
  getUsers,
  getUser,
  storeUser,
  modifyUser,
  destroyUser,
} from "../controllers/UserController.js";
import {
  getMeProfile,
  modifyMeProfile,
} from "../controllers/ProfileController.js";
import { refreshToken } from "../controllers/RefreshTokenController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/refresh-token", refreshToken);

router.get("/auth", verifyToken, isAuth);

router.get("/users", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUser);
router.post("/user", verifyToken, storeUser);
router.put("/user/:id", verifyToken, modifyUser);
router.delete("/user/:id", verifyToken, destroyUser);

router.get("/profile/me", verifyToken, getMeProfile);
router.put("/profile/me", verifyToken, modifyMeProfile);

export default router;
