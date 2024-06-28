import USER from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

import { setUser } from "../services/auth.js";

export const handleUserSignUp = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ messgae: "enter all the feilds" });
    }

    const { name, email, password } = req.body;
    const newUser = await USER.create({
      name,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const handleUserLogIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ messgae: "enter all the feilds" });
    }

    const { email, password } = req.body;
    const user = await USER.findOne({
      email,
      password,
    });

    if (!user) {
      return res.render("login", {
        error: "Invalid Username or Passsword",
      });
    }

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);

    const token = setUser(user);
    res.cookie("uid", token);

    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default { handleUserSignUp, handleUserLogIn };
