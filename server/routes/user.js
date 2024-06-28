import express from "express";
import { handleUserSignUp, handleUserLogIn } from "../controllers/user.js";

const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogIn);

export default router;
