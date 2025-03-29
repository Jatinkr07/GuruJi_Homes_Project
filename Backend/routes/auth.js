import express from "express";
import {
  login,
  logout,
  getMe,
  seedAdmin,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);
router.post("/seed", seedAdmin);

export default router;
