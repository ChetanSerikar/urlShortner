import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import urlRoute from "./routes/urlRoutes.js";
import staticRouts from "./routes/staticRoutes.js";
import userRouter from "./routes/user.js";

import { restrictToLogIdInUserOnly, checkAuth } from "./middleware/auth.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLogIdInUserOnly, urlRoute);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouts);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
