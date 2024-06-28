import express from "express";
import {
  postUrl,
  getUrl,
  deletUrl,
  getAllUrl,
  handleGetAnalytics,
} from "../controllers/url.js";

const router = express.Router();

router.get("/", getAllUrl);
router.post("/", postUrl);
router.get("/:shortID", getUrl);
router.delete("/:id", deletUrl);
router.get("/analytics/:shortID", handleGetAnalytics);

export default router;
