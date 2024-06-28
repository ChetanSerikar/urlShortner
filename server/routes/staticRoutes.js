import express from "express";
import { getAllUrl } from "../controllers/url.js";

const router = express.Router();

router.get("/", getAllUrl);

router.get("/signup", (req, res) => {
  return res.render("register");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
