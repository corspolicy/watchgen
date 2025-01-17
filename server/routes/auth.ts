import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import Login from "./auth/login.js";
import Register from "./auth/register.js";
import Info from "./auth/info.js";

const router = express.Router();

router.post("/login", () => Login);
router.post("/register", () => Register);
router.get(
  "/me",
  () => authMiddleware,
  () => Info
);

export default router;
